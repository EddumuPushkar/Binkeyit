import mongoose from "mongoose";
const catagorySchema = new mongoose.Schema({
    name:{
        type: String,
        default: "",
    },
    image:{
        type: String,
        default: "",
    },

},{timestamps: true});

export const catagory = mongoose.model("catagory", catagorySchema);