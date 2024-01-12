import { Search } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex grow shrink p-[10px] align-middle justify-center gap-[10px] w-[30%]">
      <div className="flex flex-row w-[640px] h-[46px] rounded-[12px] border-solid border-[1px] border-[#D6DDE3] bg-[#EEF6FD]">
        <div className="flex p-[10px] items-start gap-[10px] w-fit">
          <Search />
        </div>
        <InputBase
          placeholder="Search tokens and NFT collections"
          color="secondary"
          autoFocus
          sx={{
            color: "var(--No-selected, #5D6785)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            width: "100%",
            fontSize: "16px",
          }}
        />
        <div className="flex p-[10px] align-middle gap-[10px] ">
          <div className="flex flex-col p-[10px] justify-center align-middle gap-[10px] backdrop-blur-sm bg-[#E9F0FE] rounded-[5px]">
            <Typography
              sx={{
                color: "#7780A0",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                width: "fit-content",
              }}
            >
              /
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
