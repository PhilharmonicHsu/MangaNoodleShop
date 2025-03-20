"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("../models/cart.model"));
const receipt_model_1 = __importDefault(require("../models/receipt.model"));
const getCartItems = (request, response) => {
    const cartItems = cart_model_1.default.findAll();
    let total = 0;
    const orders = cartItems.map(item => {
        const targetReceipt = receipt_model_1.default.findAll().find(receipt => receipt.id === item.productId);
        total += (targetReceipt.price * item.quantity);
        return {
            id: item.id,
            receipt: {
                name: targetReceipt.name,
                price: targetReceipt.price,
                image: targetReceipt.image,
            },
            quantity: item.quantity
        };
    });
    const result = {
        orders,
        total
    };
    response.status(200).json(result);
};
const addItem = (request, response) => {
    const { productId, quantity } = request.body;
    if (!productId || !quantity) {
        response.status(500).json({ message: 'productId/quantity is empty!' });
        return;
    }
    const newCartItemData = {
        productId, quantity
    };
    const newCartItem = cart_model_1.default.insert(newCartItemData);
    response.status(200).json(newCartItem);
};
const udpateItem = (request, response) => {
    const { id } = request.params;
    const { quantity } = request.body;
    const updateData = {
        quantity: quantity
    };
    const isSuccess = cart_model_1.default.update(id, updateData);
    if (isSuccess) {
        response.status(200).json({ message: 'update successful' });
        return;
    }
    response.status(404).json('Cart Item not found');
};
const deleteItem = (request, response) => {
    const { id } = request.params;
    const isSuccess = cart_model_1.default.delete(id);
    if (isSuccess) {
        response.status(200).json({ message: 'delete successful' });
        return;
    }
    response.status(404).json('Cart Item not found');
};
const resetItem = (request, response) => {
    const isSuccess = cart_model_1.default.reset();
    if (isSuccess) {
        response.status(200).json({ message: 'delete successful' });
    }
};
exports.default = {
    getCartItems,
    addItem,
    udpateItem,
    deleteItem,
    resetItem
};
