import { create } from "zustand";
import api from "../api/axios.js";

const useCartStore = create((set) => ({
    
    items: [],

    // getTotalPrice: items.reduce(
    //     (sum, item) => sum + item.product.price * item.quantity,
    //     0,
    // ),
    clearCart : async() => {
        try{
            const response = await api.delete("/cart/removefromcart");
            if(response.data.success){
                set({ items: [] });
            }
            
        }
        catch(error){
            console.error("Failed to clear cart:", error);
        }
    },
    fetchCart: async () => {
        try {
            const response = await api.get("/cart/getmycart");
            const data = await response.data.data;
            set({ items: data });
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    },
    addToCart: async (product) => {
        try {
            const res = await api.post("/cart/addtocart", {
                productId: product._id,
                quantity: 1,
            });
            const data = await res.data.data;
            set({ items: data });
        } catch (error) {
            console.log(error);
        }
    },

    increaseQty: async (id) => {
        try {
            const res = await api.post("/cart/increasequantity", {
                productId: id,
            });
            const data = await res.data.data;
            set({ items: data });
        } catch (error) {
            console.log(error);
        }
    },

    decreaseQty: async (id) => {
        try {
            const res = await api.post("/cart/decreasequantity", {
                productId: id,
            });
            const data = await res.data.data;
            set({ items: data });
        } catch (error) {
            console.log(error);
        }
    },
}));

export default useCartStore;
