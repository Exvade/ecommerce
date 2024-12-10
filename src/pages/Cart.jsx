import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, removeFromCart, updateCartQuantity } from "../redux/slices/cartSlice";
import { updateStock } from "../redux/slices/productSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    cartItems.forEach((item) => {
      dispatch(updateStock({ id: item.id, quantity: item.quantity }));
    });

    dispatch(clearCart()); // Hapus semua item dari keranjang
    alert("Checkout berhasil! Stok produk telah diperbarui dan keranjang kosong.");
  };

  return (
    <div className="max-w-screen-lg p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div>
          <table className="w-full border border-collapse border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200">Image</th>
                <th className="px-4 py-2 border border-gray-200">Product</th>
                <th className="px-4 py-2 border border-gray-200">Price</th>
                <th className="px-4 py-2 border border-gray-200">Quantity</th>
                <th className="px-4 py-2 border border-gray-200">Total</th>
                <th className="px-4 py-2 border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-16 h-16"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="w-16 border border-gray-300 rounded"
                      min="1"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <button
                      onClick={() =>
                        dispatch(removeFromCart({ id: item.id }))
                      }
                      className="px-2 py-1 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-right">
            <h2 className="text-xl font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
