import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "^/constants/theme";

export default function CartPage() {
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
    </Box>
  );
}
