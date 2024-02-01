import express from 'express'
import { getMonthlyExpenses } from '../../controllers/expenseController.js'
const router = express.Router()

router.get('/monthly-expenses', getMonthlyExpenses)

export default router
