import express from 'express'
import { deleteOneUser, getAllUsers, getOneUser, updateOneUser } from '../../controllers/userController.js'
import authorized from '../../middlewares/auth.js'
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
router.get('/', authorized, getAllUsers)

router.get('/:id', authorized, getOneUser)

router.get('/:id', authorized, updateOneUser)

router.get('/:id', authorized, deleteOneUser)

export default router
