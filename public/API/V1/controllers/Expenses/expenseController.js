const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const FileSyncService = require('../../services/fileSyncService');

function mapReceiptFileToUrls(receiptFile) {
  const arr = Array.isArray(receiptFile) ? receiptFile : parseReceiptFileString(receiptFile);
  return arr.map(p => FileSyncService.convertToApiUrl(p) || p);
}

/**
 * Parse receiptFile from DB (JSON array of paths). Handles Windows paths where
 * backslashes may be stored/returned in a way that breaks JSON.parse.
 */
function parseReceiptFileString(receiptFile) {
  if (!receiptFile || typeof receiptFile !== 'string') return [];
  const str = receiptFile.trim();
  if (!str || str === '[]') return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e1) {
    try {
      const fixed = str.replace(/\\([^"\\/bfnrtu])/g, '\\\\$1');
      const parsed = JSON.parse(fixed);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e2) {
      logger.warn(`Expense receiptFile parse failed: ${e1.message}`);
      return [];
    }
  }
}

class ExpenseController { 

  static async saveExpense(req, res) {
    try {
      const {
        expenseDate,
        expenseType,
        description,
        amount,
        paymentMode,
        remarks,
      } = req.body;
  
      // Validate required fields
      if (!expenseDate || !expenseType || !amount || !paymentMode) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'ExpenseDate, ExpenseType, Amount, and PaymentMode are required fields.',
        });
      }
  
      // Convert amount to a number (float)
      const formattedAmount = parseFloat(amount);
      if (isNaN(formattedAmount)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Amount must be a valid number.',
        });
      }
  
      // Handle uploaded files (local path; B2 sync via FileSyncQueue)
      let receiptFiles = [];
      if (req.files && req.files.length > 0) {
        receiptFiles = req.files.map(file => file.path);
      }

      const receiptFilesString = JSON.stringify(receiptFiles);

      const newExpense = await prisma.expense.create({
        data: {
          expenseDate: new Date(expenseDate),
          expenseType,
          description,
          amount: formattedAmount,
          paymentMode,
          remarks,
          receiptFile: receiptFilesString,
        },
      });

      // Add each file to B2 sync queue
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          await FileSyncService.addToSyncQueue({
            localPath: file.path,
            fileType: 'document',
            entityType: 'expense',
            entityId: newExpense.id,
            fieldName: 'receiptFile',
          }).catch(() => {});
        }
      }

      return res.status(StatusCodes.CREATED).json({
        code: StatusCodes.CREATED,
        message: 'Expense created successfully.',
        expense: newExpense,
      });
    } catch (error) {
      logger.error(`Error saving expense: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong while saving the expense. Please try again later.',
      });
    }
  }
  
  
  static async updateExpense(req, res) {
    try {
      const { id } = req.params;
      const {
        expenseDate,
        expenseType,
        description,
        amount,
        paymentMode,
        remarks,
      } = req.body;

      if (!id || !expenseDate || !expenseType || !amount || !paymentMode) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Expense ID, expenseDate, expenseType, amount, and paymentMode are required.'
        });
      }

      const formattedExpenseDate = new Date(expenseDate);
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          message: 'Invalid value for amount. It should be a number.'
        });
      }

      const existing = await prisma.expense.findUnique({ where: { id: parseInt(id, 10) } });
      const existingPaths = existing ? parseReceiptFileString(existing.receiptFile) : [];

      const apiBaseUrl = `${req.protocol}://${req.get('host')}`;
      let keptExistingPaths = existingPaths;
      if (req.body.existingReceiptUrls) {
        try {
          const wantedUrls = typeof req.body.existingReceiptUrls === 'string'
            ? JSON.parse(req.body.existingReceiptUrls) : req.body.existingReceiptUrls;
          if (Array.isArray(wantedUrls) && wantedUrls.length >= 0) {
            const urlSet = new Set(wantedUrls.map((u) => String(u).trim()).filter(Boolean));
            keptExistingPaths = existingPaths.filter((p) => {
              const url = FileSyncService.convertToApiUrl(p, apiBaseUrl);
              return url && urlSet.has(url);
            });
          }
        } catch (e) {
          logger.warn(`Expense existingReceiptUrls parse failed: ${e.message}`);
        }
      }

      const MAX_RECEIPTS = 5;
      let receiptFilesString;
      if (req.files && req.files.length > 0) {
        const newPaths = req.files.map(f => f.path);
        const allPaths = [...keptExistingPaths, ...newPaths].slice(0, MAX_RECEIPTS);
        receiptFilesString = JSON.stringify(allPaths);
        for (const file of req.files) {
          await FileSyncService.addToSyncQueue({
            localPath: file.path,
            fileType: 'document',
            entityType: 'expense',
            entityId: parseInt(id, 10),
            fieldName: 'receiptFile',
          }).catch(() => {});
        }
      } else {
        const paths = keptExistingPaths.slice(0, MAX_RECEIPTS);
        receiptFilesString = paths.length > 0 ? JSON.stringify(paths) : '[]';
      }

      const updatedExpense = await prisma.expense.update({
        where: { id: parseInt(id, 10) },
        data: {
          expenseDate: formattedExpenseDate,
          expenseType,
          description,
          amount: parsedAmount,
          paymentMode,
          remarks,
          receiptFile: receiptFilesString,
        }
      });

      return res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        message: 'Expense updated successfully.',
        expense: updatedExpense
      });
  
    } catch (error) {
      logger.error(`Error updating expense: ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong. Please try again later.',
      });
    }
  }
  
  
    
      static async getAllExpenses(req, res) {
        try {
          const expenses = await prisma.expense.findMany();
          await Promise.all(expenses.map(e => FileSyncService.ensureEntityFiles('expense', e.id)));
          const withUrls = expenses.map(e => ({
            ...e,
            receiptFile: mapReceiptFileToUrls(e.receiptFile),
          }));
          return res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: 'Expenses retrieved successfully.',
            expenses: withUrls,
          });
        } catch (error) {
          logger.error(`Error fetching all expenses: ${error.message}`);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong. Please try again later.',
          });
        }
      }
    
      static async getExpenseById(req, res) {
        try {
          const { id } = req.params;
    
          const expense = await prisma.expense.findUnique({
            where: { id: parseInt(id, 10) } // Find expense by ID
          });
    
          if (!expense) {
            return res.status(StatusCodes.NOT_FOUND).json({
              code: StatusCodes.NOT_FOUND,
              message: 'Expense not found.'
            });
          }

          await FileSyncService.ensureEntityFiles('expense', expense.id);
    
          const expenseWithUrls = {
            ...expense,
            receiptFile: mapReceiptFileToUrls(expense.receiptFile),
          };
          return res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: 'Expense retrieved successfully.',
            expense: expenseWithUrls,
          });
        } catch (error) {
          logger.error(`Error fetching expense by ID: ${error.message}`);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong. Please try again later.',
          });
        }
      }
    
      static async deleteExpense(req, res) {
        try {
          const { id } = req.params;
    
          const expense = await prisma.expense.delete({
            where: { id: parseInt(id, 10) } // Delete expense by ID
          });
    
          return res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: 'Expense deleted successfully.',
            expense
          });
        } catch (error) {
          logger.error(`Error deleting expense: ${error.message}`);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong. Please try again later.',
          });
        }
      }
}

module.exports = ExpenseController;