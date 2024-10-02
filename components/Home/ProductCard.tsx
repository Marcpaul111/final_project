"use client";

import { Product } from "@/types";
import { Heart, ShoppingBag, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/redux/slices/Cartslice";
import { RootState } from "@/redux/store";
// toast
import { Notyf } from 'notyf';



type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const num = Math.round(product.rating.rate);
  const rating = new Array(num).fill(0);

  const notyf = new Notyf();
 
  const dispatch = useDispatch();

  const handleAddItemToCart = (product: Product) => {
    dispatch(addItemToCart(product));
    notyf.success('Item added to your cart')
  };

  return (
    <div className="p-4 shadow-md hover:shadow-2xl">
      <div className="w-[200px] h-[150px] mx-auto">
        <Image
          src={product.image}
          alt={product.title}
          height={100}
          width={100}
          className="w-[80%] h-[80%] object-contain mx-auto"
        />
      </div>
      <p className="mt-5 text-sm capitalize text-gray-300">
        {product.category}
      </p>
      <Link href={`/product/product-details/${product.id}`}>
        <h1 className="text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold ">
          {product.title}
        </h1>
      </Link>
      {/* rating */}
      <div className="flex items-center">
        {rating.map((rate) => {
          return (
            <StarIcon
              key={Math.random() * 1000}
              size={16}
              fill="yellow"
              className="text-yellow-600"
            />
          );
        })}
      </div>
      {/* product price */}
      <div className="flex items-center space-x-3">
        <p className="text-black text-base line-through font-semibold opacity-55">{`$${(
          product.price + 10
        ).toFixed(2)}`}</p>
        <p className="text-black text-lg font-bold opacity-80">
          ${product.price}
        </p>
      </div>
      {/* buttons */}
      <div className="flex items-center space-x-2 mt-4">
        <Button onClick={() => handleAddItemToCart(product)} size={"icon"} className="bg-black">
          <ShoppingBag size={15} />
        </Button>
        <Button size={"icon"} className="bg-rose-800">
          <Heart size={15} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
