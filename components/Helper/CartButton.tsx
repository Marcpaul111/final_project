"use client";

import { RootState } from "@/redux/store";
import { ShoppingBagIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartItemsSidebar from "./CartItemsSidebar";

const CartButton = () => {
  // import and access the state
  const items = useSelector((state: RootState) => state.cart.cartItems);

  const [totalQty,setTotalQty] = useState(0);

  useEffect(()=>{
    const quantity = items.reduce((total, item) => total + item.qty, 0);
    setTotalQty(quantity);
  },[items])

 

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-600 rounded-full text-center text-white flex justify-center items-center flex-col text-xs">
            {totalQty }
          </span>
          <ShoppingBagIcon size={26} cursor={"pointer"} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto h-full">
        {/* pass the items as props */}
        <CartItemsSidebar items={items}/>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
