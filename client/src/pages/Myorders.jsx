import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Myorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await api.get("/orders/get-orders");
        console.log("API Response:", res.data); // Debugging line
        

        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No orders found 🛒
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              {/* Header */}
              <div className="flex justify-between mb-2">
                <p className="font-semibold">
                  Order ID: {order._id.slice(-6)}
                </p>

                <span className="text-green-600 text-sm">
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="text-sm text-gray-700 space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t mt-3 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Myorders;