import express from "express";
import cors from "cors";
import citiesRouter from "@/routes/cities";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: [
      // "https://api.jblantonplumbing.com", // Production example url
      "http://localhost:5173", // Default port for Vite (5173)
    ],
  })
);
app.use(express.json());

// Routes
app.use("/cities", citiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
