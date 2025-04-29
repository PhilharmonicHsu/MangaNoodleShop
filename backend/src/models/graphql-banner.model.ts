import mongoose, {Schema} from "mongoose";

const BannerSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true}
})

export const Banner = mongoose.model("Banner", BannerSchema)