"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const receipt_controller_1 = __importDefault(require("../controllers/receipt.controller"));
const receiptRouter = (0, express_1.Router)();
receiptRouter.get('/', receipt_controller_1.default.getReceipts);
receiptRouter.get('/:id', receipt_controller_1.default.getReceiptById);
exports.default = receiptRouter;
