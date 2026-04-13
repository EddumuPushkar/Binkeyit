import Order from "../models/order.model.js";

// GET USER ORDERS
export const getOrderController = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 });
      

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE ORDER
export const addOrderController = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID from token:", userId); // Debugging line

    const { items, totalPrice, shippingAddress } = req.body;

    console.log("Received order data:", { items, totalPrice, shippingAddress }); // Debugging line

    if (!items || !totalPrice || !shippingAddress) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    console.log("Creating order for user:", userId); // Debugging line

    const newOrder = new Order({
      user: userId,
      items,
      totalPrice,
      shippingAddress,
    });
    await newOrder.save();

    console.log("Saving order to database..."); // Debugging line

    res.status(201).json({
      success: true,
      message: "Order created",
      order: newOrder,
    });

    console.log("Order created successfully:", newOrder); // Debugging line
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};