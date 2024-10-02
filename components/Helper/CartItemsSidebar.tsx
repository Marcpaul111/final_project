import {
  addItemToCart,
  CartItem,
  clearCart,
  removeItemfromCart,
} from "@/redux/slices/Cartslice";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";

type Props = {
  items: CartItem[];
};
const CartItemsSidebar = ({ items }: Props) => {
  const dispatch = useDispatch();

  // Add qty function
  const addQtyHandler = (item: CartItem) => {
    dispatch(addItemToCart(item));
  };

  // Remove the item from cart
  const deleteItemFromCart = (id: number) => {
    dispatch(removeItemfromCart({ id }));
  };

  return (
    <div className="my-6 h-full ">
      <h1 className="text-center font-bold text-lg mb-6">Your Cart</h1>
      {/* if cart is empty */}
      {items.length == 0 && (
        <div className="flex items-center w-full h-[50vh] flex-col my-auto justify-center">
          <Image
            src={"/images/empty-cart.png"}
            alt=""
            height={200}
            width={200}
          />
          <div className="space-y-2">
            <h1 className="text-center text-black font-semibold text-2xl">
              Your cart is empty
            </h1>
            <p className="text-center text-base font-semibold opacity-40">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              tempore!
            </p>
          </div>
          <Link href={"/"}>
            <SheetClose>
              <Button className="rounded-[5px] mt-8">Shop Now</Button>
            </SheetClose>
          </Link>
        </div>
      )}
      {/* if cart has items */}
      {items.length > 0 && (
        <div className=" ">
          {items.map((item) => {
            return (
              <div className="border-b-2  border-gray-300 border-opacity-60 p-4">
                <div className="">
                  <Image
                    src={item.image}
                    alt=""
                    height={60}
                    width={60}
                    className="object-cover mb-6"
                  />
                </div>
                <div className="mb-2">
                  <h1 className="text-sm w-4/5 font-semibold truncate">
                    {item?.title}
                  </h1>
                  <h1 className="text-base text-blue-950 font-semibold ">
                    ${(item.price * item.qty).toFixed(2)}
                  </h1>
                  <h1 className="font-bold text-base">Quantity: {item.qty}</h1>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => addQtyHandler(item)}
                    size={"sm"}
                    className="rounded-[5px] w-[70px] "
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => deleteItemFromCart(item.id)}
                    size={"sm"}
                    variant={"destructive"}
                    className="rounded-[5px] w-[50px]"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            );
          })}

          <Link href={"/cart"}>
            <SheetClose>
              <Button className="w-full mb-6 mt-6 rounded-[5px]">
                View All Cart
              </Button>
            </SheetClose>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsSidebar;
