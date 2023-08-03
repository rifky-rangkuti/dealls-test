import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import LogoIcon from "^/assets/logo.svg";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { usePathname } from "next/navigation";

export default function DrawerContent() {
  const pathname = usePathname();
  return (
    <div>
      <Toolbar>
        {/* <Link href="/">
          <Image src={LogoIcon} alt="" />
        </Link> */}
      </Toolbar>
      <Divider />
      <List>
        <Link href="/" className="mb-4">
          <ListItem disablePadding>
            <ListItemButton selected={pathname === "/"}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link href="/cart">
          <ListItem disablePadding>
            <ListItemButton selected={pathname.startsWith("/cart")}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
