import { HeadCell } from "../data/types/commonCartType";

export const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Cart ID",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: true,
    label: "total",
  },
  {
    id: "discountedTotal",
    numeric: true,
    disablePadding: true,
    label: "Discounted Total",
  },
  {
    id: "totalProducts",
    numeric: true,
    disablePadding: true,
    label: "Total Products",
  },
  {
    id: "totalQuantity",
    numeric: true,
    disablePadding: true,
    label: "Total Quantity",
  },
];
