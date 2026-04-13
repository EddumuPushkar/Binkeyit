import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    full_name:{
        type: String,
        default: "",
    },
    address:{
        type: String,
        default: "",
    },
    city:{
        type: String,
        default: "",
    },
    state:{
        type: String,
        default: "",
    },
    pincode:{
        type: String,
    },
    country:{
        type: String,
        default:"India",
    },
    status:{
        type: Boolean,
        default: true,
    }
},{timestamps: true});

export default mongoose.model("address", addressSchema);