import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer";
import { useState } from "react";
import Cart from "./components/Cart";
import "./App.css";
import { useEffect } from "react";
import useCartStore from "./zustand/useCartStore";

function App() {
    const [showCart, setShowCart] = useState(false);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        useEffect(() => {
          fetchCart();
        }, [refreshToken]);
    }
    return (
        <>
            <Header setShowCart={setShowCart} />
            <main className="min-h-[78vh]">
                <Outlet />
            </main>
            <Footer />
            {showCart && <Cart setShowCart={setShowCart} />}
        </>
    );
}

export default App;
