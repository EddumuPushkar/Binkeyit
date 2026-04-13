import cartProductModel from "../models/cartProduct.model.js";

// Reusable formatter
const formatCartItems = (items) => {
    return items.map((item) => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        quantity: item.quantity,
    }));
};

// GET CART
export const getCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("sadfgh", userId);

        const items = await cartProductModel
            .find({ userId })
            .populate("productId");

        const formattedItems = formatCartItems(items);

        return res.json({
            success: true,
            error: false,
            data: formattedItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
        });
    }
};

// ADD TO CART
export const AddToCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const existing = await cartProductModel.findOne({ userId, productId });

        if (existing) {
            existing.quantity += 1;
            await existing.save();
        } else {
            await cartProductModel.create({
                userId,
                productId,
                quantity: 1,
            });
        }

        const items = await cartProductModel
            .find({ userId })
            .populate("productId");

        const formattedItems = formatCartItems(items);

        return res.json({
            success: true,
            data: formattedItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
        });
    }
};

// INCREASE QUANTITY
export const increaseQuantityController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const product = await cartProductModel.findOne({ userId, productId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.quantity += 1;
        await product.save();

        const items = await cartProductModel
            .find({ userId })
            .populate("productId");

        const formattedItems = formatCartItems(items);

        return res.json({
            success: true,
            data: formattedItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
        });
    }
};

// DECREASE QUANTITY
export const decreaseQuantityController = async (req, res) => {
    try {
        const userId = req.user.id;

        const product = await cartProductModel.findOne({ userId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.quantity -= 1;

        if (product.quantity < 1) {
            await cartProductModel.deleteOne({ userId, productId });
        } else {
            await product.save();
        }

        const items = await cartProductModel
            .find({ userId })
            .populate("productId");

        const formattedItems = formatCartItems(items);

        return res.json({
            success: true,
            data: formattedItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
        });
    }
};

export const removeFromCartController = async (req, res) => {
    try {
        const userId = req.user.id;

        await cartProductModel.deleteOne({ userId });

        return res.status(200).json({
            success: true,
            error: false,
            message: "Cart cleared successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
        });
    }
};
