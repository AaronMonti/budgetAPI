import express from 'express'
import { createNewExpense, deleteOneExpense, getAllExpenses, getOneExpense, updateOneExpense } from '../../controllers/expenseController.js'
const router = express.Router()

/**
 * @openapi
 * /api/v1/expense:
 *   get:
 *     tags:
 *       - Get All Expenses
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

/**
 * @openapi
 * /api/v1/expense/:id:
 *   get:
 *     tags:
 *       - Get One Expense
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
router.get('/:id', getOneExpense)

/**
 * @openapi
 * /api/v1/expense:
 *   post:
 *     tags:
 *       - Create New Expense
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
router.post('/', createNewExpense)

/**
 * @openapi
 * /api/v1/expense:
 *   put:
 *     tags:
 *       - Update One Expense
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
router.put('/:id', updateOneExpense)

/**
 * @openapi
 * /api/v1/expense:
 *   delete:
 *     tags:
 *       - Delete One Expense
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
router.delete('/:id', deleteOneExpense)

export default router
