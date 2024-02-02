import express from 'express'
import { createNewExpense, deleteOneExpense, getAllExpenses, getOneExpense, updateOneExpense } from '../../controllers/expenseController.js'
import authorized from '../../middlewares/auth.js'
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
router.get('/', authorized, getAllExpenses)

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
router.get('/:id', authorized, getOneExpense)

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
router.post('/', authorized, createNewExpense)

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
router.put('/:id', authorized, updateOneExpense)

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
router.delete('/:id', authorized, deleteOneExpense)

export default router
