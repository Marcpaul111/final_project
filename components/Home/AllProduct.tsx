"use client";

import { getAllProducts } from "@/Request/Request";
import { Product } from "@/types";
import { error } from "console";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const AllProduct = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
const [loading,setLoading] = useState(true);
 
console.log(products);

useEffect(() => {
    const getProduct  = async () => {
        setLoading(true)
        try {
            const products:Product[] = await getAllProducts();
            setProducts(products);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    getProduct();
},[])

  return <div className="pt-16 pb-12">

    <h1 className="text-center text-2xl font-bold ">All Products</h1>
    {
        loading ? (
            <div className="flex justify-center items-center mt-16">
                <Loader size={32} className="animate-spin"/>
            </div>
        ) : (
            <div className="w-4/5 mt-16 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    products?.map((product) => {
                        return <ProductCard key={product.id} product={product}/>
                    })
                }
            </div>
        )
    }
  </div>;
};

export default AllProduct;
