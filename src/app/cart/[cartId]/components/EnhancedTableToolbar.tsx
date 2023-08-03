import React from "react";
import { Box, TextField, Toolbar } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { encode } from "qss";
import { useDebouncedCallback } from "use-debounce";

export default function EnhancedTableToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const [search, setSearch] = React.useState(product || "");

  const debounceRouteUpdate = useDebouncedCallback((search: string) => {
    router.replace(pathname + encode({ product: search }, "?"));
  }, 300);
  return (
    <Toolbar
      sx={{
        pl: { xs: 0, sm: 0 },
        pr: { xs: 0, sm: 0 },
      }}
      className="flex justify-between pt-1"
    >
      <Box
        sx={{
          px: 0,
        }}
        className="flex items-center justify-between w-full"
      >
        <TextField
          id="outlined-basic"
          label="Search Product"
          variant="outlined"
          sx={{
            width: 300,
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debounceRouteUpdate(e.target.value);
          }}
        />
      </Box>
    </Toolbar>
  );
}
