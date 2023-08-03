import React from "react";
import { decode, encode } from "qss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Box,
  Button,
  IconButton,
  Popper,
  Slider,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
const minDistance = 5;
export default function FilterMenu() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const brandParam = searchParams.get("brand");
  const categoryParam = searchParams.get("category");
  const stockParam = searchParams.get("stock");
  const priceRangeParam = searchParams.get("priceRange");
  const [brand, setBrand] = React.useState(brandParam || "");
  const [category, setCategory] = React.useState(categoryParam || "");
  const [stock, setStock] = React.useState(stockParam || "");
  const [price, setPrice] = React.useState<number[]>(() => {
    if (priceRangeParam) {
      return priceRangeParam.split("-").map((p) => Number(p));
    }
    return [50, 500];
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const pathname = usePathname();
  const router = useRouter();
  const debounceRouteUpdate = useDebouncedCallback(
    ({ param, value }: { param: string; value: string }) => {
      const current = decode(searchParams.toString());
      router.replace(pathname + encode({ ...current, [param]: value }, "?"));
    },
    300
  );
  return (
    <div className="relative">
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
        <Box
          sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">Autosaved Filters</p>
            <IconButton onClick={() => setAnchorEl(null)}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            id="outlined-basic"
            label="Brand"
            variant="outlined"
            sx={{
              width: 300,
            }}
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              debounceRouteUpdate({
                param: "brand",
                value: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            sx={{
              width: 300,
            }}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              debounceRouteUpdate({
                param: "category",
                value: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Stock"
            variant="outlined"
            sx={{
              width: 300,
            }}
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              debounceRouteUpdate({
                param: "stock",
                value: e.target.value,
              });
            }}
          />
          <Slider
            value={price}
            onChange={(
              event: Event,
              newValue: number | number[],
              activeThumb: number
            ) => {
              if (!Array.isArray(newValue)) {
                return;
              }
              debounceRouteUpdate({
                param: "priceRange",
                value: `${newValue[0]}-${newValue[1]}`,
              });
              if (newValue[1] - newValue[0] < minDistance) {
                if (activeThumb === 0) {
                  const clamped = Math.min(newValue[0], 10000 - minDistance);
                  setPrice([clamped, clamped + minDistance]);
                } else {
                  const clamped = Math.max(newValue[1], minDistance);
                  setPrice([clamped - minDistance, clamped]);
                }
              } else {
                setPrice(newValue as number[]);
              }
            }}
            valueLabelDisplay="auto"
            disableSwap
            max={10000}
            min={1}
          />
          <Button
            onClick={() => {
              setAnchorEl(null);
              setPrice([10, 20]);
              router.replace(pathname + encode({ product }, "?"));
            }}
            variant="text"
          >
            Clear Filter
          </Button>
        </Box>
      </Popper>
    </div>
  );
}
