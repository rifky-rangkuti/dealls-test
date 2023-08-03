"use client";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "^/constants/theme";
import { useQuery } from "react-query";
import { getCart, getCartURL } from "../data/network/apis/cart";
import CartProductTable from "./components/CartProductTable";
import { getSingleUser, getSingleUserURL } from "./data/network/apis/userApi";
import dayjs from "dayjs";

export default function CartPage({
  params: { cartId },
}: {
  params: { cartId: string };
}) {
  const { data: cart, isLoading } = useQuery({
    queryKey: [getCartURL, cartId],
    queryFn: () => getCart(cartId),
  });

  const { data: user } = useQuery({
    queryKey: [getSingleUserURL, cart?.userId],
    queryFn: () => getSingleUser(cart?.userId),
  });

  const totalAmount = cart?.products?.reduce((x, y) => {
    return (x += y.price);
  }, 0);
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
      <p className="font-semibold text-lg mb-2">Details:</p>
      <div className="bg-[#6913d8] w-full rounded px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <div className="space-y-5">
          <div className="flex">
            <p className="w-3/12 text-white font-semibold text-lg">User</p>
            <p className="flex-1 text-white font-semibold text-lg">
              : {user?.firstName + " " + user?.lastName}
            </p>
          </div>
          <div className="flex">
            <p className="w-3/12 text-white font-semibold text-lg">Added On</p>
            <p className="flex-1 text-white font-semibold text-lg">
              : {dayjs(user?.birthDate).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex">
            <p className="w-3/12 text-white font-semibold text-lg">
              # of items
            </p>
            <p className="flex-1 text-white font-semibold text-lg">
              : {cart?.products.length ?? 0}
            </p>
          </div>
          <div className="flex">
            <p className="w-3/12 text-white font-semibold text-lg">
              Total Amount
            </p>
            <p className="flex-1 text-white font-semibold text-lg">
              : {totalAmount}
            </p>
          </div>
        </div>
      </div>
      <CartProductTable rows={cart?.products || []} isLoading={isLoading} />
    </Box>
  );
}
