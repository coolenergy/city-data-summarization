import CityCard from "@/components/CityCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { generateCitySummary, getCityDetails } from "@/lib/utils";
import {
  UsersRoundIcon,
  GlobeIcon,
  MountainSnowIcon,
  SparklesIcon,
  CircleDashedIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";

export default function City() {
  const { id } = useParams();
  const { data: city } = useQuery(["city", id], () => getCityDetails(id));
  const [citySummary, setCitySummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (city) {
      const summary = localStorage.getItem(`city-summary-${id}`);
      if (summary) {
        setCitySummary(summary);
      } else {
        setCitySummary("");
      }
    }
  }, [city, id]);

  useEffect(() => {
    document.title = city
      ? `${city.name}, ${city.region} | City Details`
      : "City Details";
  }, [city]);

  if (!id || isNaN(Number(id))) return <Navigate to="/" />;

  async function generateSummary() {
    setSummaryLoading(true);
    const summary = await generateCitySummary(city!);
    setCitySummary(summary);
    setSummaryLoading(false);
    localStorage.setItem(`city-summary-${id}`, summary);
  }
  if (!city) {
    return (
      <div className="flex justify-center items-center w-full mt-24">
        <Spinner />
      </div>
    );
  }
  return (
    <main className="container flex flex-col gap-1 items-center">
      <h1 className="font-semibold text-3xl mt-2">{city.name}</h1>
      <h2 className="text-lg text-muted-foreground">
        {city.region}, {city.country}
      </h2>
      <section>
        <p className="text-muted-foreground flex gap-2 align-center">
          <UsersRoundIcon />
          <span>Population: </span>
          <span className="text-foreground font-semibold">
            {new Intl.NumberFormat().format(city.population)}
          </span>
        </p>
        <p className="text-muted-foreground flex gap-2 align-center">
          <GlobeIcon />
          <span>Latitude: </span>
          <span className="text-foreground font-semibold">
            {city.latitude.toFixed(2)}
          </span>
          <span>Longitude: </span>
          <span className="text-foreground font-semibold">
            {city.longitude.toFixed(2)}
          </span>
        </p>
        <p className="text-muted-foreground flex gap-2 align-center">
          <MountainSnowIcon />
          <span>Elevation: </span>
          <span className="text-foreground font-semibold">
            {city.elevationMeters} meters
          </span>
        </p>
      </section>
      {city.nearbyCities.length > 0 && (
        <>
          <h2 className="text-2xl mt-8 font-semibold text-center">
            {city.nearbyCities.length} Cities Found in a 100 Mile Radius:
          </h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {city.nearbyCities.map((city) => (
                <CarouselItem key={city.id} className="lg:basis-1/2">
                  <CityCard city={city} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
      <section className="text-center flex flex-col gap-2 w-full">
        <h2 className="text-2xl mt-8 font-semibold text-balance">AI Summary</h2>
        {!citySummary && (
          <Button onClick={generateSummary} className="gap-2 max-w-sm mx-auto">
            {summaryLoading ? (
              <>
                <CircleDashedIcon className="animate-spin" />
                <span>Generating Summary</span>
              </>
            ) : (
              <>
                <SparklesIcon />
                <span>Generate City Summary</span>
              </>
            )}
          </Button>
        )}
        {summaryLoading && (
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
          </div>
        )}
        {citySummary && (
          <p className="text-justify max-w-4xl mx-auto">{citySummary}</p>
        )}
      </section>
    </main>
  );
}
