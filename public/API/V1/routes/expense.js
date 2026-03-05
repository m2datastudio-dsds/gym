const express = require('express');
const ExpenseController = require('../controllers/Expenses/expenseController');
const { uploadLocal } = require('../middlewares/multerLocal');

const router = express.Router();

router.post('/expense/saveExpense', uploadLocal.array('receiptFile', 5), ExpenseController.saveExpense);
router.put('/expense/updateExpense/:id', uploadLocal.array('receiptFile', 5), ExpenseController.updateExpense);
router.get('/expense/getallExpenses', ExpenseController.getAllExpenses);
router.get('/expense/getExpensebyId/:id', ExpenseController.getExpenseById);
router.delete('/expense/deleteExpense/:id', ExpenseController.deleteExpense);

module.exports = router;
