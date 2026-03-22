import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "category",
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model("subCategory", subCategorySchema);
