import { Router } from 'express'
import userController from '../controllers/user.controller'

const userRouter = Router()

userRouter.get('/', userController.getUsers)
userRouter.post('/login', userController.loginUser)
userRouter.post('/logout', userController.logout)
userRouter.post('/register', userController.addUser)
userRouter.get('/check-auth', userController.getUserByUsername)

export default userRouter