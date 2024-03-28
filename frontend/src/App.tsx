import CityCard from "./components/CityCard";
import PopulationChart from "./components/PopulationChart";
import { getCities } from "@/lib/utils";
import { useEffect } from "react";
import { useQuery } from "react-query";

function App() {
  const { data: cities } = useQuery("cities", getCities);

  useEffect(() => {
    document.title = "City Data Summarization | J. Blanton Plumbing";
  }, []);

  return (
    <main className="px-1 py-4">
      <h1 className="text-3xl text-center text-balance font-black mb-4">
        City Data Summarization 🏙️
      </h1>
      <section className="container px-2 flex flex-col gap-2 items-center">
        <div className="hidden sm:block w-full lg:w-2/3">
          <PopulationChart cities={cities || []} />
        </div>
        {cities?.map((city) => (
          <div key={city.id} className="w-full lg:w-2/3">
            <CityCard city={city} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
