import express from 'express'
import { getAllUsers } from '../../controllers/userController.js'
const router = express.Router()

/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     tags:
 *       - Users
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
router.get('/', getAllUsers)

export default router
