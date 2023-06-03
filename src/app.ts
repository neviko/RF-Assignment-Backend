import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { activateRoutes } from "./routes";
import rateLimit from "express-rate-limit";

//TODO:helmet, express-rate-limit

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(json());
app.use(limiter);
activateRoutes();
export { app };
