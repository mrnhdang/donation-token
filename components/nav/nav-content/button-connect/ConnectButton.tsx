"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { useAccount, useConnect } from "wagmi";
import { Button, SxProps, Typography } from "@mui/material";
import SideBar from "./SideBar";

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

const TextStyle: SxProps = {
  color: "var(--Select-token, #FB118E)",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
};

export default function ConnectButton() {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen((prev) => !prev);
    };

  const connectToMetamask = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      window.open("https://metamask.io/download/", "_blank");
    } else {
      try {
        console.log();

        await connect({ connector: connectors[0] });
      } catch (e) {
        console.log(e);
      }
    }
  }, [connect]);

  return (
    <>
      <Button
        sx={ButtonStyle}
        type="button"
        onClick={toggleDrawer("right", true)}
      >
        <Typography sx={TextStyle}>Connect</Typography>
      </Button>
      <SideBar
        open={open}
        connectToMetamask={connectToMetamask}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
}
