import { Router } from 'express'
import receiptController from '../controllers/receipt.controller'

const receiptRouter = Router()

receiptRouter.get('/', receiptController.getReceipts)
receiptRouter.get('/:id', receiptController.getReceiptById)

export default receiptRouter