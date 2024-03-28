import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  GlobeIcon,
  UsersRoundIcon,
  MountainSnowIcon,
  RouteIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CityCard({
  city,
}: {
  city: City & { elevationMeters?: number; distance?: number };
}) {
  return (
    <Card className="sm:flex justify-between">
      <div>
        <CardHeader className="justify-center">
          <CardTitle>{city.name}</CardTitle>
          <CardDescription>
            {city.region}, {city.country}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground flex gap-2 align-center">
            <UsersRoundIcon />
            <span>Population: </span>
            <span className="text-foreground font-semibold">
              {new Intl.NumberFormat().format(city.population)}
            </span>
          </p>
          <p className="text-muted-foreground flex gap-2 align-center">
            <GlobeIcon />
            <span>Lat: </span>
            <span className="text-foreground font-semibold">
              {city.latitude.toFixed(2)}
            </span>
            <span>Long: </span>
            <span className="text-foreground font-semibold">
              {city.longitude.toFixed(2)}
            </span>
          </p>
          {city.elevationMeters && (
            <p className="text-muted-foreground flex gap-2 align-center">
              <MountainSnowIcon />
              <span>Elevation: </span>
              <span className="text-foreground font-semibold">
                {city.elevationMeters} meters
              </span>
            </p>
          )}
          {city.distance && (
            <p className="text-muted-foreground flex gap-2 align-center">
              <RouteIcon />
              <span className="sm:text-nowrap">Distance to {city.name}: </span>
              <span className="text-foreground font-semibold sm:text-nowrap">
                {city.distance} Miles
              </span>
            </p>
          )}
        </CardContent>
      </div>
      <CardFooter className="flex justify-start sm:justify-end sm:pt-6">
        <Link
          to={`/city/${city.id}`}
          className={buttonVariants({ className: "gap-1 group" })}
        >
          Go to details{" "}
          <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
}
