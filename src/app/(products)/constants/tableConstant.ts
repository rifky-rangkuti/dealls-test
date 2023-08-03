import { HeadCell } from "../data/types/commonProductType";

export const headCells: readonly HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "brand",
    numeric: true,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "stock",
    numeric: true,
    disablePadding: false,
    label: "Stock",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
];
