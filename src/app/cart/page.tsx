"use client";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "^/constants/theme";
import { useQuery } from "react-query";
import { getCarts, getCartsURL } from "./data/network/apis/cart";
import CartTable from "./components/CartTable";

export default function CartPage() {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: [getCartsURL],
    queryFn: getCarts,
    select: (payload) => {
      if (payload?.carts) {
        return payload.carts;
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
      <CartTable rows={rows} isLoading={isLoading} />
    </Box>
  );
}
