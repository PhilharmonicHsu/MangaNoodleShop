import {Request, Response} from 'express'
import receiptModel from '../models/receipt.model'

const getReceipts = (request: Request, response: Response) => {
    const receipts = receiptModel.findAll()

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