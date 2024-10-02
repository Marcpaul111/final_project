"use client";

import { clearCart } from "@/redux/slices/Cartslice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page() {

  const dispatch = useDispatch();
  // clear cart after successful payment
  useEffect(() => {
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Order Successful
        </h2>
        <p className="text-gray-700 mb-4">Thank you so much for your order.</p>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          CHECK STATUS
        </button>
      </div>
    </div>
  );
}
