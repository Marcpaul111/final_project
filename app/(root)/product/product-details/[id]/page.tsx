import { Button } from "@/components/ui/button";
import { getProductById, getRelatedProducts } from "@/Request/Request";
import { Product } from "@/types";
import { ShoppingCart, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const singleProduct: Product = await getProductById(id);

  const relatedProducts: Product[] = await getRelatedProducts(
    singleProduct.category
  );

  const num = Math.round(singleProduct?.rating?.rate);
  const rating = new Array(num).fill(0);

  return (
    <div>
      <div className="text-center my-5 text-black text-[1.7rem]">
        PRODUCT DETAILS
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-10 my-16">
        {/* content */}
        <div className="flex justify-center items-center">
          <Image
            src={singleProduct.image}
            alt={singleProduct.title}
            width={340}
            height={300}
          />
        </div>
        <div className="my-auto space-y-5">
          <h1 className="font-bold text-black text-4xl">
            {singleProduct.title}
          </h1>
          <div className="mt-4 flex items-center">
            {rating.map((rate) => {
              return (
                <StarIcon
                  size={16}
                  fill="yellow"
                  key={Math.random() * 5000}
                  className="text-yellow-500"
                />
              );
            })}
          </div>
          <div className="space-y-4">
            <p className="font-semibold text-3xl">
              <span className="text-gray-500 line-through mr-2">
                ${`${(singleProduct.price + 10).toFixed(2)}`}{" "}
              </span>{" "}
              ${singleProduct.price}
            </p>
            {/* buttons */}
            <div className="space-x-3">
              <Button className="rounded-[20px] py-[15px] px-[20px] bg-[#94817733] text-[#000] shadow-lg hover:text-white">
                Checkout
              </Button>
              <Button className="rounded-[20px] py-[15px] px-[20px] bg-[#2f2f2f] text-[#eee] shadow-lg hover:text-black hover:bg-[#94817733]">
                Add To Cart
                <span className="bg-[#545454] rounded-full p-1 ml-2">
                  <ShoppingCart size={14} className="" />
                </span>
              </Button>
            </div>
          </div>

          {/* description */}
          <div className="mr-10 mt-3 space-y-3">
            <p className="opacity-50 text-base">{singleProduct.description}</p>
            <div className="">
              <p className="opacity-50 text-base">
                Category: {singleProduct.category}
              </p>
              <p className="opacity-50 text-base">Tag: CodevShop</p>
              <p className="opacity-50 text-base">SKU: {Math.random() * 500}</p>
            </div>
          </div>
        </div>
      </div>

      {/* related products */}
      <div className="h-screen">
        <h1 className="text-black text-[1.7rem] text-center my-10">
          Related Products
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12">
          {relatedProducts.map((product) => {
            return (
              <div className="rounded-xl w-[200px] h-[300px] m-auto shadow-lg ">
                <div className="p-3">
                  <Image
                    src={product.image}
                    alt={product.title}
                    key={product.id}
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                  <Link
                    href={`${product.id}`}
                    className=" text-center cursor-pointer hover:text-black hover:underline hover:font-bold"
                  >
                    <p className="truncate">{product.title}</p>
                  </Link>
                </div>
                <div className=""></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
