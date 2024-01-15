"use client";
import React, { useCallback, useState } from "react";
import { useConnect } from "wagmi";
import { Button, SxProps, Typography } from "@mui/material";
import SideBar from "./SideBar";

const TextStyle: SxProps = {
  color: "var(--Select-token, #FB118E)",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
};

type ConnectButtonProps = {
  ButtonStyle: SxProps | undefined;
};

const ConnectButton: React.FC<ConnectButtonProps> = ({ ButtonStyle }) => {
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
  }, [connect, connectors]);

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
};
export default ConnectButton;
