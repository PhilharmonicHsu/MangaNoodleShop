"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banner_model_1 = __importDefault(require("../models/banner.model"));
const getBanners = (request, response) => {
    const receipts = banner_model_1.default.findAll();
    response.status(200).json(receipts);
};
exports.default = {
    getBanners,
};
