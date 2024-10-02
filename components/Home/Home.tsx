import HomePage from "@/app/(root)/(home)/page";
import React from "react";
import { Button } from "../ui/button";
import Hero from "./Hero";
import Category from "./Category";
import AllProduct from "./AllProduct";

const Home = () => {
  return (
    <div>
      <div className="">
        <Hero/>
        <Category />
        <AllProduct />
      </div>
      ;
    </div>
  );
};

export default Home;
