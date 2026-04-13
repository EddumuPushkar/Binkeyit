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
    description:{
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

//create a text index

productSchema.index({
    name : "text",
    description : "text",
},{
    name : 10,
    description : 5
})

export default mongoose.model("product", productSchema);