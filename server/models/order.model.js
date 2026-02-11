import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    orderId:{
        type: String,
        required:[true, "Order ID is required"],
        unique: true,
    },
    //Added productId and product_details for optimization purpose means to reduce the number of joins while fetching order details for a user  
    productId:{
        type: mongoose.Schema.ObjectId,
        ref: "product"
    },
    product_details:{
        _id:String,
        name: String,
        image: Array,
    },
    paymentId:{
        type: String,
        default: "",
    },
    payment_status:{
        type: String,
        default: "",
    },
    delivery_address:{
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },
    subTotalAmt:{
        type: Number,
        default: 0,
    },
    totalAmt:{
        type: Number,
        default: 0,
    },
    invoice_receipt:{
        type: String,
        default: "",
    }

},{timestamps: true});
export const order = mongoose.model("order", orderSchema);