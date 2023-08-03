import { HeadCell } from "../data/types/commonCartProductType";

export const headCells: readonly HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "discountPercentage",
    numeric: true,
    disablePadding: false,
    label: "Discount Percentage",
  },
  {
    id: "discountedPrice",
    numeric: true,
    disablePadding: false,
    label: "Discount Price",
  },
];
