import express from 'express'
import { deleteOneUser, getAllUsers, getOneUser, updateOneUser } from '../../controllers/userController.js'
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

router.get('/:id', getOneUser)

router.get('/:id', updateOneUser)

router.get('/:id', deleteOneUser)

export default router
