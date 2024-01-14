import express from 'express'
import { createNewExpense, deleteOneExpense, getAllExpenses, getOneExpense, updateOneExpense } from '../../controllers/expenseController.js'
const router = express.Router()

/**
 * @openapi
 * /api/v1/expense:
 *   get:
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', getAllExpenses)

router.get('/:id', getOneExpense)

router.post('/', createNewExpense)

router.put('/:id', updateOneExpense)

router.delete('/:id', deleteOneExpense)

export default router
