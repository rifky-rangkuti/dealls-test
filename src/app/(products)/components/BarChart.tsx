import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IProduct } from "../data/types/productsApiType";
import { IBrand } from "../data/types/chartType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ rows }: { rows: IProduct[] }) {
  const brands = rows.reduce<IBrand>((x, y) => {
    if (x[y.brand]) {
      x[y.brand] += 1;
    } else {
      x[y.brand] = 1;
    }
    return x;
  }, {});

  const data = React.useMemo(
    () => ({
      labels: Object.keys(brands),
      datasets: [
        {
          label: "Brands",
          data: Object.values(brands),
          backgroundColor: "#6913d8",
        },
      ],
    }),
    [brands]
  );
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={data}
    />
  );
}
