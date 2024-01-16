"use client";

import { useEffect, useState } from "react";
import { erc20ABI, useAccount, useContractRead, useDisconnect } from "wagmi";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ConnectButton from "./button-connect/ConnectButton";
import Ethereum from "@/public/ethereum.png";
import Arbitrum from "@/public/arbitrum-arb-logo.svg";
import Optimism from "@/public/optimism-ethereum-op-logo.svg";
import Polygon from "@/public/polygon-matic-logo.svg";
import Base from "@/public/base-logo-in-blue.svg";
import BNBChain from "@/public/bnb-bnb-logo.svg";
import Avalance from "@/public/avalanche-avax-logo.svg";
import Celo from "@/public/celo-logo.svg";
import DropdownButton from "@/generic/DropdownButton";
import { MenuItemType } from "@/interface";
import { SMART_CONTRACT_ADDRESS } from "@/abi";
import { SxProps } from "@mui/material";
import { ethers } from "ethers";

const CoinList: MenuItemType[] = [
  {
    name: "Ethereum",
    icon: Ethereum,
  },
  {
    name: "Arbitrum",
    icon: Arbitrum,
  },
  {
    name: "Optimism",
    icon: Optimism,
  },
  {
    name: "Polygon",
    icon: Polygon,
  },
  {
    name: "Base",
    icon: Base,
  },
  {
    name: "BNB Chain",
    icon: BNBChain,
  },
  {
    name: "Avalanche",
    icon: Avalance,
  },
  {
    name: "Celo",
    icon: Celo,
  },
];

const ButtonStyle: SxProps = {
  textTransform: "none",
  display: "flex",
  width: "90px",
  height: "40px",
  padding: "10px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  border: "1px solid #FFFFFF",
  background: "#FFD4EB",
};

export const Account = () => {
  const account = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [currentAddress, setAccountAddress] = useState<string>(
    account.address || ""
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: tokenBalance, isLoading } = useContractRead({
    address: SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [account.address as `0x${string}`],
  });

  const disconnectWallet = async () => {
    localStorage.removeItem("address");
    setAccountAddress("");
    disconnectAsync();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAccountAddress(account.address || "");
  }, [account]);

  return (
    <div className="flex grow items-center mr-[10px] align-middle justify-end w-[140px] ">
      <DropdownButton menuItem={CoinList} enableEtheIcon={true} />
      {currentAddress ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              borderRadius: "18px",
              background: "#F5F6FC",
              width: "fit-content",
              padding: 0,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* Account Avatar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              style={{
                margin: "5px 0px 5px 11px",
              }}
            >
              <mask
                id="mask0_2_494"
                // style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="25"
                style={{
                  maskType: "alpha",
                }}
              >
                <circle cx="12" cy="12.5" r="12" fill="#C4C4C4" />
              </mask>
              <g mask="url(#mask0_2_494)">
                <path
                  d="M22 -5.5L13 0.5L24 16H30.75L35.25 12.75L22 -5.5Z"
                  fill="#18A9F2"
                />
                <path d="M19 9L24 16L22 30.5L6.5 25.5L19 9Z" fill="#F28E02" />
                <path
                  d="M13 0.5L19 9L6.5 25.5H1.5L-9 2L9 -4.5L13 0.5Z"
                  fill="#FB186F"
                />
              </g>
            </svg>

            <Typography
              sx={{
                textOverflow: "ellipsis",
                width: "fit-content",
                color: "black",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "normal",
                justifyItems: "start",
                gap: "10px",
                margin: "10px",
              }}
              noWrap
            >
              {currentAddress.length > 5
                ? `${currentAddress.slice(0, 10 / 2)}...${currentAddress.slice(
                    -8 / 2
                  )}`
                : currentAddress}
            </Typography>
          </IconButton>
        </Tooltip>
      ) : (
        <ConnectButton ButtonStyle={ButtonStyle} />
      )}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar />
          <Typography className="w-20" variant="body2" noWrap={true}>
            {currentAddress}
          </Typography>
        </MenuItem>
        <Divider />
        {tokenBalance !== undefined && (
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {ethers.formatEther(tokenBalance?.toString())}
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            disconnectWallet();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
