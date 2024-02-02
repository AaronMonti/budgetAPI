import express from 'express'
import { getMonthlyExpenses } from '../../controllers/expenseController.js'
import authorized from '../../middlewares/auth.js'
const router = express.Router()

router.get('/monthly-expenses', authorized, getMonthlyExpenses)

export default router
