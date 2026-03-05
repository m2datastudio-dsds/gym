const prisma = require('../../config/db.config');
const { StatusCodes } = require('http-status-codes');
const HttpException = require('../../exceptions/HttpException');
const { logger } = require('../../utils/logger');
const moment = require('moment');
const path = require("path");


class DashboardController {
    // Method to get the counts for the dashboard
    static async getDashboardCounts(req, res, next) {
      try {
        const today = moment(); // Get today's date

        // Total members
        const totalMembers = await prisma.member.count();
  
        // Active members
        const activeMembers = await prisma.member.count({
          where: { active: true },
        });
  
        // Inactive members
        const inactiveMembers = await prisma.member.count({
          where: { active: false },
        });
  
        // Men members
        const menMembers = await prisma.member.count({
          where: { gender: 'Male' },
        });
  
        // Women members
        const womenMembers = await prisma.member.count({
          where: { gender: 'Female' },
        });
  
        // Transgender members
        const transgenderMembers = await prisma.member.count({
          where: { gender: 'Transgender' },
        });
  
        // Amount received (sum of paidAmount from payment table)
        const amountReceived = await prisma.payment.aggregate({
          _sum: { paidAmount: true },
        });
  
        // Fetch the latest payment for each member by using findMany with distinct and orderBy
        const latestPayments = await prisma.payment.findMany({
          distinct: ['memberID'],  // Get the latest payment for each member
          orderBy: {
            createdAt: 'desc',      // Ensure we're getting the latest payments
          },
        });
  
        // Calculate the sum of pending amounts from the latest payments
        const amountPending = latestPayments.reduce((sum, payment) => sum + (payment.pending || 0), 0);
  
        // Fetch all members and filter for today's birthdays (MM-DD)
        const membersWithBirthdays = await prisma.member.findMany({
          where: {
              dateOfBirth: {
              not: null, // Ensure dob is not null
            },
          },
        });
  
      
        // Filter members with today's birthday by comparing only MM-DD
        const todayBirthdayMembers = membersWithBirthdays.filter(member => {
          const dateOfBirth = moment(member.dateOfBirth, 'YYYY-MM-DD');
          return dateOfBirth.format('MM-DD') === today.format('MM-DD');
        }).length;
  
        // Fetch all staff and filter for today's birthdays (MM-DD)
        const staffWithBirthdays = await prisma.staff.findMany({
          where: {
              dateOfBirth: {
              not: null, // Ensure dob is not null
            },
          },
        });
  
        // Filter staff with today's birthday by comparing only MM-DD
        const todayBirthdayStaff = staffWithBirthdays.filter(staff => {
          const dateOfBirth = moment(staff.dateOfBirth, 'YYYY-MM-DD');
          return dateOfBirth.format('MM-DD') === today.format('MM-DD');
        }).length;
  
        // Respond with the data
        return res.status(StatusCodes.OK).json({
          totalMembers,
          activeMembers,
          inactiveMembers,
          menMembers,
          womenMembers,
          transgenderMembers,
          amountReceived: amountReceived._sum.paidAmount || 0,
          amountPending: amountPending || 0,
          todayBirthdayMembers,
          todayBirthdayStaff,
        });
      } catch (error) {
        logger.error('Error in getDashboardCounts:', error);
        next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch dashboard data.'));
      }
    }
  }
  
  module.exports = DashboardController;