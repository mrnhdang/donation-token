"use client";
import CustomePagination from "@/generic/CustomePagination";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { CSSProperties, useMemo, useState } from "react";

interface Data {
  id: string;
  address: string;
  amount: number;
}

function createData(id: string, address: string, amount: number): Data {
  return { id, address, amount };
}

const rows = [
  createData("#1231", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 159),
  createData("#1232", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 237),
  createData("#1233", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 262),
  createData("#1234", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 305),
  createData("#1235", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 353),
  createData("#1236", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 3),
  createData("#1237", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 24),
  createData("#1238", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 3233),
  createData("#1239", "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 4),
];

const columns = [
  {
    headerName: "ID",
  },
  {
    headerName: "Address",
  },
  {
    headerName: "Amount",
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableRowTextStyle: CSSProperties = {
  textAlign: "center",
  fontVariantNumeric: "lining-nums proportional-nums",
  fontFeatureSettings: `'dlig' on`,
  fontSize: "14.222px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "0.142px",
};

export default function HistoryCollectionTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: string) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <TableContainer
      sx={{
        width: "864px",
        borderRadius: "10.667px",
        border: "0.889px solid #EBEBEE",
        background: "#FFFFFF",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                sx={{
                  color: "rgba(73, 69, 79, 0.80)",
                }}
                style={TableRowTextStyle}
                key={index}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row, index) => {
            const isItemSelected = isSelected(index);
            return (
              <TableRow
                key={index}
                hover
                onClick={(event) => handleClick(event, index)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
                sx={{
                  cursor: "pointer",
                  color: "var(--text-color-80-opacity, rgba(34, 34, 34, 0.90))",
                }}
              >
                <TableCell sx={TableRowTextStyle}>{row.id}</TableCell>
                <TableCell sx={TableRowTextStyle}>{row.address}</TableCell>
                <TableCell sx={TableRowTextStyle}>{row.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="p-[30px]">
        <CustomePagination
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </TableContainer>
  );
}
