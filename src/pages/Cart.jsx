import "animate.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconMinus from "../components/icon/IconMinus";
import IconPlus from "../components/icon/IconPlus";
import { removeSelectedItems, updateCartQuantity } from "../redux/slices/cartSlice";
import { updateStock } from "../redux/slices/productSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.products);

  const [selectedItems, setSelectedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity }));
  };

  const getStockById = (id) => {
    const product = products.find((product) => product.id === id);
    return product?.stock || 0;
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }

    selectedItems.forEach((id) => {
      const item = cartItems.find((item) => item.id === id);
      if (item) {
        dispatch(updateStock({ id: item.id, quantity: item.quantity }));
      }
    });

    // Hapus barang yang dipilih dari keranjang
    dispatch(removeSelectedItems(selectedItems));
    alert("Checkout berhasil! Stok produk telah diperbarui.");
    setSelectedItems([]); // Reset pilihan setelah checkout
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      selectedItems.includes(item.id) ? total + item.price * item.quantity : total,
    0
  );

  return (
    <div className="w-full min-h-[100vh] bg-gray-200">
      <div className="relative max-w-screen-xl pt-20 mx-auto z-1">
        <h1 className="hidden mb-6 text-2xl font-bold md:mb-0 md:block md:mt-3">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/" className="text-blue-500 hover:underline">
              Go shopping
            </Link>
          </div>
        ) : (
          <div className="md:mt-4 md:flex md:justify-between">
            <div className="md:w-[68%]">
              <div className="hidden gap-3 px-3 py-4 mb-2 bg-white rounded-t-lg md:flex md:items-center">
                <input type="checkbox"
                  id="all"
                  className="w-[18px] h-[18px] border-2 border-gray-400 rounded-sm focus:ring-0 checked:bg-primary"
                  checked={selectedItems.length === cartItems.length}
                  onChange={(e) => handleSelectAll(e.target.checked)} />
                <label htmlFor="all" className="text-sm font-bold">Add All</label>
              </div>
              {cartItems.map((item) => {
                const stock = getStockById(item.id);
                return (
                  <div key={item.id} className="pb-[8px] bg-gray-200">
                    <div className="flex items-center justify-between gap-3 px-3 py-4 bg-white">
                      <input
                        type="checkbox"
                        className="self-start md:w-[18px] md:h-[18px] border-2 border-gray-400 rounded-sm focus:ring-0 checked:bg-primary"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <div className="md:w-[100px] md:aspect-square md:border-2 border-gray-100 md:rounded-md">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-contain w-[78px] md:w-full md:aspect-square"
                        />
                      </div>
                      <div className="flex flex-col w-full md:gap-4">
                        <div className="flex flex-col justify-center w-full md:justify-between md:flex-row">
                          <p className="text-xs font-medium md:text-sm md:w-[80%] line-clamp-1 md:line-clamp-none">{item.title}</p>
                          <p className="text-xs font-bold md:text-base">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center self-end border border-gray-200 rounded-lg p-[5px] h-8">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))
                            }
                            className="w-4 text-base rounded text-primary hover:bg-blue-600 aspect-square"
                          >
                            <IconMinus />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            min="1"
                            className="w-[40px] h-4 text-sm font-medium text-center border-none rounded focus:ring-0"
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value, 10);
                              if (newQuantity >= 1) {
                                handleQuantityChange(item.id, newQuantity);
                              }
                            }}
                            onBlur={() => {
                              if (item.quantity > stock) {
                                handleQuantityChange(item.id, stock);
                              }
                            }}
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, Math.min(item.quantity + 1, stock))
                            }
                            className="w-4 text-base rounded aspect-square text-primary hover:bg-blue-600"
                          >
                            <IconPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:w-[30%] fixed bottom-0 flex justify-between w-full px-4 py-3 text-right border-t md:flex-col bg-white md:rounded-lg md:justify-center md:p-[24px] md:self-start md:sticky md:top-[80px]">
              <div className="flex items-center gap-2 md:hidden ">
                <input
                  type="checkbox"
                  id="all"
                  className="w-[18px] h-[18px] border-2 border-gray-400 rounded-sm focus:ring-0 checked:bg-primary"
                  checked={selectedItems.length === cartItems.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <label htmlFor="all" className="text-xs">
                  All
                </label>
              </div>
              <div className="flex gap-2 md:flex-col md:gap-4">
                <div className="justify-start hidden md:flex">
                  <h1 className="text-base font-bold">Shopping summary</h1>
                </div>
                <div className="flex flex-col items-end justify-end md:flex-row md:justify-between md:border-b md:border-gray-100 md:pb-4">
                  <p className="text-xs md:text-sm">Total</p>
                  <h2 className="text-sm font-bold md:text-base">${totalPrice.toFixed(2)}</h2>
                </div>
                <button
                  onClick={handleCheckout}
                  className="px-6 py-2 font-bold text-white rounded-lg bg-primary hover:bg-red-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed left-0 right-0 flex items-center justify-center p-4 text-sm font-bold text-white bg-red-500 bottom-16 animate__animated animate__bounceInUp md:bottom-0">
            Please select items before checking out!
          </div>
        )}
      </div>
    </div>
  );
}
