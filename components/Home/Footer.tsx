import { Facebook, Twitter, X } from "lucide-react";
import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-4/5 border-b-[1.2px] pb-8 border-b-slate-400 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
      {/* 1st column */}
      <div className="">
        <div className="">Logo</div>
        <p className="text-black text-sm opacity-60">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
          corrupti.
        </p>
        <p className="text-black text-sm opacity-60 mt-6">
          ( +639 ) 872-7284-243 - codevshop@businesshub.com
        </p>
      </div>

      {/* 2nd */}
      <div className="lg:mx-auto">
        <h1 className="footer_title">Information</h1>
        <p className="footer_link">About Us</p>
        <p className="footer_link">Privacy Policy</p>
        <p className="footer_link">Return Policy</p>
        <p className="footer_link">Shipping Policy</p>
        <p className="footer_link">Dropshipping</p>
      </div>

      {/* 3rd */}
      <div className="lg:mx-auto">
        <h1 className="footer_title">Account</h1>
        <p className="footer_link">Dashboard</p>
        <p className="footer_link">My Orders</p>
        <p className="footer_link">Account Details</p>
        <p className="footer_link">Track Orders</p>
      </div>
      {/* 4th */}
      <div className="lg:mx-auto ">
        <h1 className="footer_title">Social Media</h1>
        <div className="flex gap-7 justify-center">
          <p className="footer_link">
            <FaTwitter />
          </p>
          <p className="footer_link">
            <FaFacebookSquare />
          </p>
          <p className="footer_link">
            <FaInstagram />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
