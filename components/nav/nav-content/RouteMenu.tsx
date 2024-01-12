"use client";
import Typography from "@mui/material/Typography";
import React from "react";
import { usePathname } from "next/navigation";

interface ItemMenu {
  key: React.Key;
  label: string;
  route: string;
}

const ROUTE_LIST = [
  {
    key: 1,
    label: "Donate",
    route: "/donate",
  },
  {
    key: 2,
    label: "History Transaction",
    route: "/owner-donated",
  },
];

export default function RouteMenu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-row align-middle items-center p-[10px] w-[50%]">
      {ROUTE_LIST.map((item: ItemMenu) => (
        <Typography
          key={item.key}
          noWrap
          component="a"
          href={item.route}
          sx={{
            display: "flex",
            margin: 0,
            justifyContent: "center",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: 400,
            marginLeft: "16px",
            marginRight: "19px",
            minWidth: "12%",
            color: "var(--No-selected, #5D6785)",
            ...(pathname === item.route && {
              color: "var(--Selection, #0D111C)",
              cursor: "pointer",
              fontWeight: 600,
            }),
            "&:hover": {
              color: "var(--Selection, #0D111C)",
              cursor: "pointer",
              fontWeight: 600,
            },
          }}
        >
          {item.label}
        </Typography>
      ))}
    </div>
  );
}
