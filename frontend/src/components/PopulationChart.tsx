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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Population by city comparison",
    },
  },
};

export default function PopulationChart({ cities }: { cities: City[] }) {
  const labels = cities.map((city) => city.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Population",
        data: cities.map((city) => city.population),
        backgroundColor: "hsla(221.2, 83.2%, 53.3%)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
