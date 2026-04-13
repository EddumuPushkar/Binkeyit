import Address from "../models/address.model.js";
import user from "../models/user.model.js";
export async function getAddressController(req, res) {
    try {
        const id = req.user.id;

        const addresses = await Address.find({ userId: id });

        return res.json({
            success: true,
            address: addresses,
            error: false,
        });

    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}

export async function addAddressController(req, res) {
    try {
        const  id = req.user.id;
        const { full_name, address, city, state, pincode } =
            req.body;
        const newAddress = new Address({
            userId: id,
            full_name: full_name,
            address,
            city,
            state,
            pincode,
        });
        await newAddress.save();
        return res.json({
            message: "Address added successfully",
            error: false,
            success: true,
            address: newAddress,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}
export async function editAddressController(req, res) {
    try {
        const { id } = req.user.id;
        const {
            fullName,
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
        } = req.body;
        const currAddress = await Address.findOne({ userId: id });
        if (!currAddress) {
            return res.status(404).json({
                message: "Address not found",
                error: true,
                success: false,
            });
        }
        const updatedAddress = await address.findByIdAndUpdate(
            currAddress._id,
            {
                full_name: fullName,
                address_line,
                city,
                state,
                pincode,
                country,
                mobile,
            },
            { new: true },
        );
        return res.json({
            message: "Address updated successfully",
            error: false,
            success: true,
            address: updatedAddress,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}
export async function deleteAddressController(req, res) {
    try {
        const { id } = req.user.id;
        const currAddress = await address.findOne({ userId: id });
        if (!currAddress) {
            return res.status(404).json({
                message: "Address not found",
                error: true,
                success: false,
            });
        }
        await address.findByIdAndDelete(currAddress._id);
        return res.json({
            message: "Address deleted successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}
