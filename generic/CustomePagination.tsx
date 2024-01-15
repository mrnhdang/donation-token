import React, { useCallback, useEffect, useState } from "react";
import DropdownButton from "./DropdownButton";
import { MenuItemType } from "@/interface";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import IconButton from "@mui/material/IconButton";
import { SxProps, Typography } from "@mui/material";

interface CustomePaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  handleChangeRowsPerPage: (event: string) => void | undefined;
  handleChangePage: (event: number) => void | undefined;
}

const PaginationButtonStyle: SxProps = {
  height: "21.45px",
  // have to change minWidth for this button to be able shrink it
  minWidth: "35px",

  flexShrink: 0,
  borderRadius: "3.368px",
  background: "#DEDEDE",
  color: "rgba(51, 51, 51, 0.80)",
  padding: "0px 5px 0px 5px",
};

const PaginationMenuStyle: SxProps = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  flexDirection: "row",
};

const PaginationTextStyle: SxProps = {
  color: "rgba(51, 51, 51, 0.80)",
  fontSize: "14px",
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: "normal",
};

const IconButtonStyle: SxProps = {
  width: "21.333px",
  height: "21.333px",
  padding: "0",
};

const CustomePagination: React.FC<CustomePaginationProps> = ({
  count,
  rowsPerPage,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(count / rowsPerPage)
  );

  const RowsPerPageArr: MenuItemType[] = [
    { name: "5", onClick: () => handleChangeRowsPerPage("5") },
    { name: "10", onClick: () => handleChangeRowsPerPage("10") },
    { name: "25", onClick: () => handleChangeRowsPerPage("25") },
  ];

  const createPageItems = useCallback(() => {
    const tempArr = [];
    for (let i = 0; i < totalPage; i++) {
      tempArr.push({
        name: `${i + 1}`,
        onClick: () => handleChangePage(i),
      });
    }
    return tempArr;
  }, [handleChangePage, totalPage]);

  const PageArr: MenuItemType[] = createPageItems();

  useEffect(() => {
    if (Math.round(count / rowsPerPage) !== 0)
      setTotalPage(Math.ceil(count / rowsPerPage));
  }, [count, rowsPerPage]);

  return (
    <div className="flex grow w-auto">
      <div className=" flex grow space-x-3 items-center w-fit ">
        <DropdownButton
          menuItem={RowsPerPageArr}
          enableLabelIcon={true}
          ButtonStyle={PaginationButtonStyle}
          MenuStyle={PaginationMenuStyle}
        />{" "}
        <Typography sx={PaginationTextStyle}> per page</Typography>
      </div>

      <div className="flex w-fit space-x-3 items-center">
        <DropdownButton
          menuItem={PageArr}
          enableLabelIcon={true}
          ButtonStyle={PaginationButtonStyle}
          MenuStyle={PaginationMenuStyle}
        />{" "}
        <Typography sx={PaginationTextStyle}> of {totalPage} pages</Typography>
        <IconButton
          sx={IconButtonStyle}
          disabled={page <= 0}
          onClick={() => handleChangePage(page - 1)}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          sx={IconButtonStyle}
          disabled={page >= totalPage - 1}
          onClick={() => handleChangePage(page + 1)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default CustomePagination;
