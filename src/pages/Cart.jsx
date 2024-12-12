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

  const incrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
  };

  const handleCheckout = () => {
    cartItems.forEach((item) => {
      dispatch(updateStock({ id: item.id, quantity: item.quantity }));
    });

    dispatch(clearCart());
    alert("Checkout berhasil! Stok produk telah diperbarui dan keranjang kosong.");
  };

  return (
    <div className="max-w-screen-lg p-6 mx-auto">
      <h1 className="mt-12 mb-6 text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-20 h-20"
              />
              <div className="flex-1 ml-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQuantity(item.id, item.quantity)}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.id, item.quantity)}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  +
                </button>
              </div>
              <div className="ml-4">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart({ id: item.id }))}
                className="px-2 py-1 ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
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
