import mongoose, {Schema} from "mongoose";

const ReceiptSchema = new Schema({
    name: {type: String, required: true},
    ingredients: {type: Array, required: true},
    calories: {type: Number, required: true},
    price: {type: Number, required: true},
    rates: {type: Number, required: true},
    image: {type: String, required: true}
})

export const Receipt = mongoose.model("Receipt", ReceiptSchema);