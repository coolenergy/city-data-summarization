import { Router } from "express";
import { OpenAI } from "openai";
import {
  GEODB_BASE_URL,
  COUNTRY,
  MIN_POPULATION,
  LIMIT,
  RADIUS,
} from "@/constants";
import "dotenv/config";

const citiesRouter = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

citiesRouter.get("/", async (_, res) => {
  try {
    const response = await fetch(
      `${GEODB_BASE_URL}/cities?countryIds=${COUNTRY}&types=CITY&minPopulation=${MIN_POPULATION}&limit=${LIMIT}`
    ).then(res => res.json());
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching cities");
  }
});

citiesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).send("Invalid city id.");
  }

  try {
    // Get city details
    const { data: cityData } = await fetch(`
      ${GEODB_BASE_URL}/cities/${id}
    `).then(res => res.json());

    // Get nearby cities
    const { data: nearbyCities } = await fetch(`
      ${GEODB_BASE_URL}/cities/${id}/nearbyCities?types=CITY&radius=${RADIUS}
    `).then(res => res.json());

    const cityDetails = { ...cityData, nearbyCities };
    res.send(cityDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while fetching details of city with id: " + id);
  }
});

citiesRouter.post("/summary", async (req, res) => {
  const { city }: { city: CityDetails } = req.body;
  // Extract relevant city data to cut down token usage
  const relevantCityData = {
    name: city.name,
    region: city.region,
    population: city.population,
    latitude: city.latitude.toFixed(2),
    longitude: city.longitude.toFixed(2),
    elevationMeters: city.elevationMeters,
    nearbyCities: city.nearbyCities.map(city => city.name),
  };
  try {
    // Generate city summary with OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You will receive a json object with data relating to a city in the US, write a quick summary of the city and some interesting fact about the city that you think the user would like to know. Make sure to mention all of the data in the json object.",
        },
        { role: "user", content: JSON.stringify(relevantCityData) },
      ],
      model: "gpt-3.5-turbo",
    });
    return res.send({ summary: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating city summary");
  }
});

export default citiesRouter;
