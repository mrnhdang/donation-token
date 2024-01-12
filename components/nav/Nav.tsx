"use-client";
import { InputBase, Typography } from "@mui/material";
import React, { CSSProperties } from "react";
import { Account } from "./nav-content/Account";
import { Search } from "@mui/icons-material";
import Unicorn from "@/public/unicorn.png";
import Image from "next/image";
import RouteMenu from "./nav-content/RouteMenu";
import SearchBar from "./nav-content/SearchBar";

const UnicornStyle: CSSProperties = {
  width: "32px",
  height: "32px",
  objectFit: "contain",
};

export default function Nav() {
  return (
    <div className="flex flex-wrap align-middle min-w-full">
      <div className="flex-shrink-0 box-border align-middle self-center w-fit h-fit ml-[17px]">
        <Image src={Unicorn} style={UnicornStyle} alt="Unicorn image" />
      </div>
      <RouteMenu />
      <SearchBar />
      <Account />
    </div>
  );
}
