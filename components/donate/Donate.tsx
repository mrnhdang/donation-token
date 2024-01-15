"use client";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { CSSProperties, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { SMART_CONTRACT_ADDRESS, ABI } from "@/abi";
import { useAccount, useContractWrite } from "wagmi";
import { SxProps } from "@mui/material";

const DonateFieldStyle: CSSProperties = {
  padding: "20px",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

const InputLabelStyle: CSSProperties = {
  display: "flex",
  padding: "10px",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  borderRadius: "16px",
  gap: "10px",
  height: "32px",
  width: "113px",
  fontSize: "20px",
  fontStyle: "normal",
  lineHeight: "normal",
};

const ButtonStyleSx: SxProps = {
  textTransform: "none",
  color: "var(--Select-token, #FB118E)",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
  background: "#FFD4EB",
  fontSize: "20px",
  borderRadius: "19px",
  width: "446px",
  height: "58px",
  flexShrink: 0,
};

export default function Donate() {
  const account = useAccount();
  const [address, setAddress] = useState<string>();
  const [amount, setAmount] = useState<string>("0");

  const { writeAsync: transferDonate } = useContractWrite({
    address: SMART_CONTRACT_ADDRESS as `0x${string}`,
    abi: ABI,
    functionName: "transferDonate",
    args: [address, amount || 0],
  });

  const donateToken = async () => {
    try {
      await transferDonate();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        flexShrink: 0,
        borderRadius: "15px",
        border: "1px solid var(--Background-stroke-main-swap, #D2D9EE)",
        background: "var(--Background-main-swap, #FFF)",
        padding: "10px",
        marginTop: "74px",
        display: "grid",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          marginLeft: "12px",
          marginTop: "11px",
          marginBottom: "15px",
        }}
      >
        Donate
      </Typography>

      <div className="flex flex-shrink rounded-[12px] w-[446px] h-[101px] bg-[#F5F6FC] mb-[4px]">
        <InputBase
          name="address"
          placeholder="Enter address..."
          color="secondary"
          autoFocus
          style={DonateFieldStyle}
          onChange={(e) => setAddress(e.target.value)}
        />
        <InputLabel
          style={InputLabelStyle}
          sx={{
            color: "#000000",
            fontWeight: 500,
            textJustify: "center",
            background: "var(--Select-token, #E9F0FE)",
          }}
        >
          Address
        </InputLabel>
      </div>

      <div className="flex flex-shrink rounded-[12px] w-[446px] h-[101px] bg-[#F5F6FC] mb-[4px]">
        <InputBase
          name="amount"
          type="number"
          color="secondary"
          autoFocus
          style={DonateFieldStyle}
          defaultValue={"0"}
          maxRows={20}
          onChange={(e) => setAmount(e.target.value)}
        />
        <InputLabel
          style={InputLabelStyle}
          sx={{
            background: "var(--Select-token, #FB118E)",
            color: "#FFF",
            fontWeight: 600,
            textJustify: "center",
          }}
        >
          Value
        </InputLabel>
      </div>

      <Button
        sx={ButtonStyleSx}
        onClick={donateToken}
        disabled={!account?.address}
      >
        Donate
      </Button>
    </Box>
  );
}
