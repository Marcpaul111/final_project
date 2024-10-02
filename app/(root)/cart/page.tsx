"use client";

import { Button } from "@/components/ui/button";
import {
  addItemToCart,
  CartItem,
  clearCart,
  removeItemfromCart,
} from "@/redux/slices/Cartslice";
import { RootState } from "@/redux/store";
import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { url } from "inspector";
import { Loader2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  // importing the state from store
  const items = useSelector((state: RootState) => state.cart.cartItems);

  //   loading state
  const [loading, setLoading] = useState(false);

  // total quantity
  const totalQty = items.reduce((total, item) => total + item.qty, 0);

  // total price
  const totalPrice = items
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);

  // calculate vat (12%)
  const vat = (+totalPrice * +0.12).toFixed(2);

  //   shipping fee
  const fee = 20;

  // total price with vat
  const finalPrice = (+totalPrice + +vat + +fee).toFixed(2);

  // import reducers
  const dispatch = useDispatch();

  // for adding quantity
  const addItemQty = (item: CartItem) => {
    dispatch(addItemToCart(item));
  };
  const decrementItemQty = (id: number) => {
    dispatch(removeItemfromCart({ id }));
  };

  //   check if the user is signedin
  const { user } = useUser();

  //   checkout using stripe
  async function checkout() {
    try {
      // Ensure the base URL is defined
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        throw new Error("Base URL is not defined");
      }

      setLoading(true); // Start loading

      // Send the cart items to the checkout endpoint
      const response = await fetch(`${baseUrl}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: items, // Sending cart items to the backend
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to process checkout");
      }

      const data = await response.json(); // Handle response (if any)
      console.log("Checkout successful:", data);

      if (data?.clearCart) {
        dispatch(clearCart());
      }

      if (data?.url) {
        const checkoutUrl = data?.url;
        setLoading(false);
        window.location.href = checkoutUrl;
      }

      // Stop loading after success
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false); // Stop loading in case of error
    }
  }

  return (
    <div className="mt-8 min-h-[100vh] ">
      {/* if empty */}

      {items.length === 0 && (
        <div className="flex justify-center w-full h-[80vh] flex-col items-center space-x-2">
          <Image
            src={"/images/empty-cart.png"}
            height={320}
            width={320}
            alt=""
          />
          <h1 className="font-bold">Your Cart Is Empty</h1>
          <Link href={"/"}>
            <Button className="rounded-[5px] mt-8">Shop Now</Button>
          </Link>
        </div>
      )}

      {/* if has items */}
      {items.length > 0 && (
        <div className="md:w-4/5 w-[95%]  mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12">
          {/* items */}
          <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4 ">
            <h1 className="p-4 text-xl sm:text-2xl font-bold text-white bg-black">
              Your Cart ({totalQty} Items)
            </h1>
            {items.map((item) => {
              return (
                <div className="" key={item.id}>
                  <div className="flex pb-6 mt-2 p-5 border-b-[1.5px] border-opacity-25 border-gray-500 items-center space-x-10">
                    <div className="w-[10%]">
                      <Image src={item.image} width={80} height={80} alt="" />
                    </div>
                    <div className="">
                      <h1 className="text-xs sm:text-xl  font-bold ">
                        {item?.title}
                      </h1>
                      <h1 className="sm:text-lg text-xs font-bold">
                        Category: {item?.category}
                      </h1>
                      <h1 className="sm:text-lg text-xs font-bold">
                        ${item?.price}
                      </h1>
                      <h1 className="sm:text-lg text-xs font-bold">Quantity</h1>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrementItemQty(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div
                          className="w-12 text-center"
                          aria-live="polite"
                          aria-label="Current quantity"
                        >
                          {item.qty}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addItemQty(item)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Item Summary */}
          <div className="xl:col-span-2">
            <div className="sticky top-[25vh] p-6 rounded-[8px] shadow-md z-30">
              <div className="w-full max-w-md mx-auto bg-white p-6 font-sans">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT</span>
                    <span className="font-semibold">${vat}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="font-semibold">$20</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-bold">Total</span>
                  <span className="text-xl font-bold">${finalPrice}</span>
                </div>
                <Link href="/sign-in">
                  {!user && (
                    <Button className="w-full bg-[#0c0503] hover:bg-[#e6c019] text-white font-bold py-3 rounded-none">
                      Sign In To Checkout
                    </Button>
                  )}
                </Link>
                {user && (
                  <div className="">
                    {loading ? (
                      <Button
                        disabled
                        className="w-full bg-[#0c0503] hover:bg-[#e6c019] text-white font-bold py-3 rounded-none"
                      >
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span>Processing...</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={checkout}
                        className="w-full bg-[#0c0503] hover:bg-[#e6c019] text-white font-bold py-3 rounded-none"
                      >
                        PROCEED TO CHECKOUT
                      </Button>
                    )}
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By clicking 'Proceed to Checkout', you will be redirected
                      to the Checkout Page
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
