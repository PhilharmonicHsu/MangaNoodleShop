import mongoose, {Schema} from "mongoose";
import { User as IUser } from "types/user";

const UserSchema: Schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true}
});

export const User = mongoose.model<IUser>("User", UserSchema);