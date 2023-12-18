import express from 'express'
import { authMiddleware } from '../middleware/auth.js'


import {
	login,
	logout,
	register,
	fetchUser,
	fetchUsers,
	checkAuth,
	updateUserStatus
} from '../controllers/user.js'



const userRouter = express.Router()

userRouter.get('/check-Auth', authMiddleware, checkAuth)
userRouter.get('/:id', fetchUser)
userRouter.get('/', fetchUsers)
userRouter.put('/:userId/toggle-status', updateUserStatus)


userRouter.post('/login', login)
userRouter.get('/logout', logout)

export default userRouter