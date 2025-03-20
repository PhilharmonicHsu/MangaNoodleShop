import { CartItem } from "types/cart";
import { v4 as uuidv4 } from 'uuid'


const cartItems: CartItem[] = [];

class CartModel {
    findAll() {
        return cartItems
    }

    insert(newCartItemData: Omit<CartItem, 'id'>): CartItem {
        const targetItem = cartItems.find(
            cartItem => cartItem.productId === newCartItemData.productId
        )

        if (targetItem) {
            targetItem.quantity += 1;

            return targetItem
        } else {
            const newCartItem: CartItem = {
                id: uuidv4(),
                productId: newCartItemData.productId,
                quantity: newCartItemData.quantity
            }
    
            cartItems.push(newCartItem)

            return newCartItem
        }        
    }

    update(id: string, data: Partial<CartItem>) {
        const foundIndex = cartItems.findIndex(cartItem => cartItem.id === id);
        
        if (foundIndex === -1) {
            return false;
        }

        const updatedCartItem: CartItem = {
            ...cartItems[foundIndex],
            quantity: data.quantity ?? cartItems[foundIndex].quantity
        }

        cartItems[foundIndex] = updatedCartItem;

        return true;
    }

    delete(id: string) {
        const foundIndex = cartItems.findIndex(cartItem => cartItem.id === id)
        if (foundIndex === -1) {
            return false
        }
        cartItems.splice(foundIndex, 1)

        return true;
    }

    reset() {
        cartItems.length = 0

        return true;
    }
}

export default new CartModel;