import { Receipt } from "../models/receipt.model";
import { Receipt as IReceipt } from "../types/receipt";

const getReceipts = async () => {
    const receipts = await Receipt.find()

    return receipts;
}

const createReceipt = async (data: Omit<IReceipt, 'id'>) => {
    const receipt = new Receipt(data);

    return await receipt.save();
}

export default {
    getReceipts,
    createReceipt
}