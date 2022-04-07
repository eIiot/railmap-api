import fetch from "node-fetch";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

let caltrainData;

console.log("fetched new data at " + new Date());

fetch(
  `https://api.511.org/transit/VehicleMonitoring?api_key=${process.env.NEXT_PUBLIC_CALTRAIN_API_KEY}&agency=CT&format=json`
)
  .then((res) => res.json())
  .then((data) => {
    caltrainData = data;
  });

caltrainData = new Date();

setInterval(() => {
  console.log("fetched new data at " + new Date());
  fetch(
    `https://api.511.org/transit/VehicleMonitoring?api_key=${process.env.NEXT_PUBLIC_CALTRAIN_API_KEY}&agency=CT&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      caltrainData = data;
    });
}, 60 * 1000);

app.get("/api/caltrain", (req, res) => {
  res.status(200).json(caltrainData);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
