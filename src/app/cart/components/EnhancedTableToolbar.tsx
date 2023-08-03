"use client";
import React from "react";
import { Box, TextField, Toolbar } from "@mui/material";

export default function EnhancedTableToolbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
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
          label="Search Cart ID"
          variant="outlined"
          sx={{
            width: 300,
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Box>
    </Toolbar>
  );
}
