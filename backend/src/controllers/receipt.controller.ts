import {Request, Response} from 'express'
import receiptModel from '../models/receipt.model'
import { Receipt } from "types/receipt";

const getReceipts = (request: Request<{}, {}, {}, {name?:string}>, response: Response) => {
    const {name} = request.query;
    let receipts: Receipt[] = [];
    
    if (name) {
        receipts = receiptModel.getReceiptsByName(name)
    } else {
        receipts = receiptModel.findAll()
    }
    
    response.status(200).json(receipts)
}

const getReceiptById = (request: Request<{id:string}>, response: Response) => {
    const receipt = receiptModel.getReceiptById(request.params.id)
    if (! receipt) {
        response.status(404)
    }

    response.status(200).json(receipt)
}

export default {
    getReceipts,
    getReceiptById
}