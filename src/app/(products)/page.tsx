"use client";
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "^/constants/theme";
import ProductTable from "./components/ProductTable";
import { Tab, Tabs } from "@mui/material";
import { getProducts, getProductsURL } from "./data/network/apis/products";
import { useQuery } from "react-query";
import BarChart from "./components/BarChart";

export default function ProductPage() {
  const [current, setCurrent] = React.useState(0);
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
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 0, sm: 3 },
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={current}
          onChange={(_, val) => {
            setCurrent(val);
          }}
        >
          <Tab label="Product List" />
          <Tab label="Brand Chart" />
        </Tabs>
      </Box>
      {current === 0 && <ProductTable rows={rows} isLoading={isLoading} />}
      {current === 1 && (
        <div className="pt-10">
          <BarChart rows={rows} />
        </div>
      )}
    </Box>
  );
}
