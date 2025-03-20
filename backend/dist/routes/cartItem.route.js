"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartItem_controller_1 = __importDefault(require("../controllers/cartItem.controller"));
const cartRouter = (0, express_1.Router)();
cartRouter.get('/', cartItem_controller_1.default.getCartItems);
cartRouter.post('/', cartItem_controller_1.default.addItem);
cartRouter.put('/:id', cartItem_controller_1.default.udpateItem);
cartRouter.delete('/:id', cartItem_controller_1.default.deleteItem);
cartRouter.post('/reset', cartItem_controller_1.default.resetItem);
exports.default = cartRouter;
