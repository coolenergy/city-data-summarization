type GeoDBResponse = {
  links: Link[];
  data: City[];
  metadata: Metadata;
};

type Link = {
  rel: string;
  href: string;
};

type Metadata = {
  currentOffset: number;
  totalCount: number;
};

type City = {
  id: number;
  wikiDataId: string;
  city: string;
  country: string;
  countryCode: string;
  name: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
};

type CityDetails = City & {
  elevationMeters: number;
  nearbyCities: (City & { distance: number })[];
};
