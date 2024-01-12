"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import MetaMaskIcon from "@/public/metamask.svg";
import UniswapIcon from "@/public/uniswap-uni-logo.svg";
import WalletConncetIcon from "@//public/wallet-connect-logo.svg";
import CoinBaseIcon from "@/public/coinbase-logo.svg";
import Image from "next/image";
import SettingIcon from "@/public/Setting.svg";
import { IconButton } from "@mui/material";

type SideBarProps = {
  open: boolean;
  connectToMetamask: () => void;
  toggleDrawer: (
    archor: string,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void | undefined;
};

const WALLETS = [
  { name: "MetaMask", icon: MetaMaskIcon },
  { name: "Uniswap Wallet", icon: UniswapIcon },
  { name: "WalletConnect", icon: WalletConncetIcon },
  { name: "Coinbase Wallet", icon: CoinBaseIcon },
];

const SideBar: React.FC<SideBarProps> = ({
  open,
  connectToMetamask,
  toggleDrawer,
}) => {
  const list = (anchor: string) => (
    <Box
      sx={{
        width: "391px",
        display: "flex",
        flexFlow: "column",
        padding: "14px 16px 16px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex">
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            color: "#000",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          Connect a wallet
        </Typography>
        <IconButton className="fill-[#E9F0FE] w-[40px] h-[40px] rounded-[10px]">
          <Image src={SettingIcon} alt="Setting icon ..." />
        </IconButton>
      </div>

      <List
        sx={{
          marginBottom: "21px",
          borderRadius: "25px",
          border: "1px solid #FFFFFF",
          overflow: "hidden",
        }}
      >
        {WALLETS.map((text, index) => (
          <ListItem
            key={text.name}
            disablePadding
            onClick={() => connectToMetamask()}
          >
            <ListItemButton
              sx={{
                background: "var(--Bar-swap, #F5F6FC)",
                display: "flex",
                height: "76px",
                padding: "10px 10px 10px 17px",
                alignItems: "center",
                flexShrink: 0,
                marginBottom: "2px",
              }}
            >
              <ListItemIcon>
                <Image src={text.icon} alt={text.name} height={40} width={40} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      flexFlow: "row",
                      justifyContent: "start",
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {text.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div className=" flex-shrink-0">
        <Typography
          sx={{
            color: "var(--Font-Terms-and-condition, #7780A0)",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            width: "359px",
            height: "46px",
          }}
        >
          By connecting a wallet, you agree to Uniswap Labs’
          <a className="font-[600]"> Terms of Service </a>and consent to its
          Privacy Policy. (Last Updated 6.7.23)
        </Typography>
      </div>
    </Box>
  );
  return (
    <Drawer anchor={"right"} open={open} onClose={toggleDrawer("right", false)}>
      {list("right")}
    </Drawer>
  );
};

export default SideBar;
