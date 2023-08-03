"use client";
import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Data, Order } from "../data/types/commonProductType";
import { filterString, getComparator } from "../utils/dataManipulator";
import { useQuery } from "react-query";
import { getProducts, getProductsURL } from "../data/network/apis/products";
import { CircularProgress } from "@mui/material";
import { stableSort } from "../utils/stableSort";
import { useSearchParams } from "next/navigation";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";

export default function ProductTable() {
  const searchParams = useSearchParams();
  const { data: rows = [], isLoading } = useQuery({
    queryKey: [getProductsURL],
    queryFn: getProducts,
    select: (payload) => {
      if (payload?.products) {
        return payload.products;
      }
      return [];
    },
  });
  const product = searchParams.get("product");
  const brand = searchParams.get("brand");
  const price = searchParams.get("priceRange");
  const stock = searchParams.get("stock");
  const category = searchParams.get("category");
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("title");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {};

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const filteredRows = React.useMemo(
    () =>
      rows
        .filter((row) => filterString(row.title, product || ""))
        .filter((row) => {
          if (!brand) {
            return true;
          } else {
            return filterString(row.brand, brand);
          }
        })
        .filter((row) => {
          if (!category) {
            return true;
          } else {
            return filterString(row.category, category);
          }
        })
        .filter((row) => {
          if (!stock) {
            return true;
          } else {
            return Number(row.stock) === Number(stock);
          }
        })
        .filter((row) => {
          if (!price) {
            return true;
          } else {
            const priceParam = price.split("-").map((p) => Number(p));
            return (
              Number(row.price) >= priceParam[0] &&
              Number(row.price) <= priceParam[1]
            );
          }
        }),
    [brand, category, price, product, rows, stock]
  );
  console.log(price);
  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box className="w-screen sm:w-full overflow-auto">
      <Box className="w-full pl-4 pt-4 pr-1">
        <EnhancedTableToolbar />
        {isLoading ? (
          <div className="w-full h-48 grid place-items-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.title)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
