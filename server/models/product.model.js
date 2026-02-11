import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: [],
    },
    catagory:[
        {
            type : mongoose.Schema.ObjectId,
            ref: "catagory"
        }
    ],
    sub_catagory:[
        {
            type : mongoose.Schema.ObjectId,
            ref: "subCatagory"
        }
    ],
    unit:{
        type: String,
        default: ""
    },
    stock:{
        type: Number,
        default: null,
    },
    price:{
        type: Number,
        default: null,
    },
    dicount:{
        type: Number,
        default: null
    },
    discription:{
        type: String,
        default: "",
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type: Boolean,
        default: false,
    }


},{timestamps: true});

export const product = mongoose.model("product", productSchema);