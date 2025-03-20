"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const cartItems = [];
class CartModel {
    findAll() {
        return cartItems;
    }
    insert(newCartItemData) {
        const targetItem = cartItems.find(cartItem => cartItem.productId === newCartItemData.productId);
        if (targetItem) {
            targetItem.quantity += 1;
            return targetItem;
        }
        else {
            const newCartItem = {
                id: (0, uuid_1.v4)(),
                productId: newCartItemData.productId,
                quantity: newCartItemData.quantity
            };
            cartItems.push(newCartItem);
            return newCartItem;
        }
    }
    update(id, data) {
        var _a;
        const foundIndex = cartItems.findIndex(cartItem => cartItem.id === id);
        if (foundIndex === -1) {
            return false;
        }
        const updatedCartItem = Object.assign(Object.assign({}, cartItems[foundIndex]), { quantity: (_a = data.quantity) !== null && _a !== void 0 ? _a : cartItems[foundIndex].quantity });
        cartItems[foundIndex] = updatedCartItem;
        return true;
    }
    delete(id) {
        const foundIndex = cartItems.findIndex(cartItem => cartItem.id === id);
        if (foundIndex === -1) {
            return false;
        }
        cartItems.splice(foundIndex, 1);
        return true;
    }
    reset() {
        cartItems.length = 0;
        return true;
    }
}
exports.default = new CartModel;
