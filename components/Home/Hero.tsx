import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex h-[calc(100vh-12vh)] w-full justify-center flex-col">
      <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* content */}
        <div className="">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold uppercase">
            mega sale <span className="text-rose-700">Special</span> Offer up to{" "}
            <span className="text-yellow-300">60%</span>
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-black text-opacity-70 mt-4 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            doloribus nulla, quae earum autem impedit odit deserunt cum laborum
            facere! Aspernatur quasi ullam fugit dolor hic pariatur magnam ipsum
            perferendis sunt! Iste repudiandae vero porro. Eaque, omnis unde?
            Enim eius odio excepturi voluptatibus voluptate amet dignissimos
            vitae, adipisci architecto illum delectus maxime atque?
          </p>
          <div className="flex mt-6 items-center space-x-4">
            <Button size={"lg"} className="bg-blue-700">
              Shop Now
            </Button>
            <Button size={"lg"} className="">
              Explore More
            </Button>
          </div>
        </div>

        {/* hero image */}
        <div className="hidden lg:block">
          <Image
            src={"/images/hero.svg"}
            alt=""
            width={600}
            height={600}
            className="lg:h-[50%] lg:w-[50%] xl:w-[80%] xl:h-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
