import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

let caltrainData = "Starting up, please wait...";
let viaRailData = "Starting up, please wait...";
let actData = "Starting up, please wait...";

console.log("fetched new data at " + new Date());

setInterval(() => {
  console.log("fetched new data at " + new Date());

  fetch(
    `https://api.511.org/transit/VehicleMonitoring?api_key=${process.env.NEXT_PUBLIC_CALTRAIN_API_KEY}&agency=CT&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      caltrainData = data;
    });

  fetch(
    `https://api.511.org/transit/VehicleMonitoring?api_key=${process.env.NEXT_PUBLIC_CALTRAIN_API_KEY}&agency=AC&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      actData = data;
    });

  fetch(`https://tsimobile.viarail.ca/data/allData.json`)
    .then((res) => res.json())
    .then((data) => {
      viaRailData = data;
    });
}, 2 * 60 * 1000);

app.get("/v1/caltrain", (req, res) => {
  res.status(200).json(caltrainData);
});

app.get("/v1/act", (req, res) => {
  res.status(200).json(actData);
});

app.get("/v1/viarail", (req, res) => {
  res.status(200).json(viaRailData);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
