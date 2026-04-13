import productModel from "../models/product.model.js";

export const AddProductController = async (req, res) => {
    try {
        const {
            name,
            image,
            catagory,
            sub_catagory,
            unit,
            stock,
            price,
            dicount,
            discription,
            more_details,
            publish,
        } = req.body;

        if (!name || !Array.isArray(image) || image.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Name and Image are required",
                error: true,
            });
        }

        const newProduct = new productModel({
            name,
            image,
            catagory,
            sub_catagory,
            unit,
            stock: stock ? Number(stock) : 0,
            price: price ? Number(price) : 0,
            dicount: dicount ? Number(dicount) : 0,
            discription,
            more_details: Array.isArray(more_details) ? more_details : [],
            publish: publish ?? false,
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            error: false,
            data: savedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            error: true,
        });
    }
};

export const getProductController = async (req, res) => {
    try {
        let { page, limit, search } = req.body;

        // default values
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const query = search
            ? {
                  $text: {
                      $search: search,
                  },
              }
            : {};

        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            productModel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            productModel.countDocuments(query),
        ]);

        return res.json({
            message: "product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPages: Math.ceil(totalCount / limit),
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
export const getProductBySubcategoryIdController = async (req, res) => {
    try {
        const { subcategoryId } = req.params;

        const products = await productModel.find({
            sub_catagory: subcategoryId,
        });

        return res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getProductDetailController = async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log("AP", id);

        const data = await productModel.findById(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.json({
            error : false,
            success: true,
            data: data,
        });

    }
    catch (error) {
        console.log("AP", error.message);
        
        res.status(500).json({
            error : true,
            success: false,
            message: error.message,
        });
    }
}
