import mongoose from "mongoose";
const cartProductSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        default:1,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps: true});
export default mongoose.model("cartProduct", cartProductSchema);