"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_model_1 = __importDefault(require("../models/receipt.model"));
const getReceipts = (request, response) => {
    const receipts = receipt_model_1.default.findAll();
    response.status(200).json(receipts);
};
const getReceiptById = (request, response) => {
    const receipt = receipt_model_1.default.getReceiptById(request.params.id);
    if (!receipt) {
        response.status(404);
    }
    response.status(200).json(receipt);
};
exports.default = {
    getReceipts,
    getReceiptById
};
