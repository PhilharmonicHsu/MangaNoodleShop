import {Request, Response} from 'express'
import cartModel from '../models/cart.model'
import { CartItem } from 'types/cart'


const getCartItems = (request: Request, response: Response) => {
    const cartItems = cartModel.findAll()

    response.status(200).json(cartItems)
}

const addItem = (request: Request<{}, {}, Omit<CartItem, 'id'>>, response: Response) => {
    const { productId, quantity } = request.body

    if (!productId || !quantity) {
        response.status(500).json({ message: 'productId/quantity is empty!' })
    
        return
    }

    const newCartItemData = {
        productId, quantity
    }

    const newCartItem = cartModel.insert(newCartItemData)

    response.status(200).json(newCartItem)
}

const udpateItem = (request: Request<{id: string}, {}, Omit<CartItem, 'id'>>, response: Response) => {
    const {id} = request.params;
    const {quantity} = request.body;
    const updateData: Partial<CartItem> = {
        quantity: quantity
    }

    const isSuccess = cartModel.update(id, updateData);

    if (isSuccess) {
        response.status(200).json({message: 'update successful'})

        return
    }

    response.status(404).json('Cart Item not found')
}

const deleteItem = (request: Request<{id: string}>, response: Response) => {
    const {id} = request.params;
    const isSuccess = cartModel.delete(id);

    if (isSuccess) {
        response.status(200).json({message: 'delete successful'})

        return
    }

    response.status(404).json('Cart Item not found')
}

export default {
    getCartItems,
    addItem,
    udpateItem,
    deleteItem
}