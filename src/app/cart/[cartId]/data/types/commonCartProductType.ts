import { ICartProduct } from "./cartProductType";

export type Order = "asc" | "desc";
export interface HeadCell {
  disablePadding: boolean;
  id: keyof ICartProduct;
  label: string;
  numeric: boolean;
}
export interface EnhancedTableToolbarProps {
  numSelected: number;
}
export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ICartProduct
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
