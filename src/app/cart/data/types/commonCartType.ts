import { ICart } from "./cartTableType";

export type Order = "asc" | "desc";
export interface HeadCell {
  disablePadding: boolean;
  id: keyof ICart;
  label: string;
  numeric: boolean;
}
export interface EnhancedTableToolbarProps {
  numSelected: number;
}
export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ICart
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
