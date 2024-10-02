import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBox from "../Helper/SearchBox";
import { HeartIcon, UserIcon } from "lucide-react";
import CartButton from "../Helper/CartButton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="h-[12vh] sticky top-0 bg-white shadow-md">
      <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full z-50">
        {/* Logo */}
        <Link href="/">
          Logo
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Search box */}
          <SearchBox />
          <HeartIcon size={26} cursor={"pointer"} />
          {/* Shopping cart */}
          <CartButton />

          {/* User Button */}
          {/* IF signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* if signed out */}
          <SignedOut>
            <SignInButton>
              <UserIcon size={26} cursor={"pointer"} />
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
