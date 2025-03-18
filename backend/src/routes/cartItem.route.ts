import { Router } from 'express'
import cartController from '../controllers/cartItem.controller'

const cartRouter = Router()

cartRouter.get('/', cartController.getCartItems)
cartRouter.post('/', cartController.addItem)
cartRouter.put('/:id', cartController.udpateItem)
cartRouter.delete('/:id', cartController.deleteItem)

export default cartRouter