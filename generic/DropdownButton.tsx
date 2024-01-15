import React, { CSSProperties, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Ethereum from "../public/ethereum.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SxProps, Typography } from "@mui/material";
import { MenuItemType } from "@/interface";

interface DropdownButtonProps {
  menuItem: MenuItemType[];
  enableEtheIcon?: boolean | false;
  enableLabelIcon?: boolean | false;
  ButtonStyle?: SxProps;
  MenuStyle?: SxProps;
}

const IconStyle: CSSProperties = {
  justifySelf: "center",
  alignSelf: "center",
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  menuItem,
  enableEtheIcon,
  enableLabelIcon,
  ButtonStyle,
  MenuStyle,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-row justify-center align-bottom m-0 p-0 w-fit">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={ButtonStyle}
      >
        {enableEtheIcon && (
          <Image src={Ethereum} style={IconStyle} alt="Etherum image" />
        )}
        {enableLabelIcon && <h1>{selected}</h1>}
        <KeyboardArrowDownIcon style={IconStyle} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={MenuStyle}
      >
        {menuItem?.map((item, index) => (
          <MenuItem
            sx={MenuStyle}
            key={index}
            onClick={() => {
              if (item?.onClick) {
                item.onClick();
              }
              handleClose();
              setSelected(item.name);
            }}
          >
            {item?.icon && (
              <Image
                className="box-border mr-[10px]"
                src={item.icon}
                width={20}
                height={20}
                alt="Icon..."
              />
            )}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 485,
                lineHeight: "normal",
              }}
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownButton;
