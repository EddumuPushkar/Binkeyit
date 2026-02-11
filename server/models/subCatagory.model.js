import mongoose from "mongoose";
const subCatagorySchema = new mongoose.Schema({
    name:{
        type: String,
        default: "",
    },
    image:{
        type: String,
        default: "",
    },
    catagory :[
        {
            type : mongoose.Schema.ObjectId,
            ref: "catagory"
        }
    ]
},{timestamps: true});

export const subCatagory = mongoose.model("subCatagory", subCatagorySchema);