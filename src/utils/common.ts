export const toolbarNameGetter = (pathname: string) => {
  if (pathname === "/") {
    return "Products";
  }
  if (pathname.startsWith("/cart")) {
    return "Cart";
  }
};
