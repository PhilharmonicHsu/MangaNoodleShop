import { Router } from 'express'
import cartController from '../controllers/cartItem.controller'
import { checkAuth } from '../middlewares/auth.middleware'

const cartRouter = Router()

cartRouter.get('/', cartController.getCartItems)
cartRouter.post('/', cartController.addItem)
cartRouter.put('/:id', cartController.udpateItem)
cartRouter.delete('/:id', cartController.deleteItem)
cartRouter.post('/order', checkAuth, cartController.resetItem)
cartRouter.post('/cancel', cartController.resetItem)

export default cartRouter