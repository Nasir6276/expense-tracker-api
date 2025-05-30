import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

app.use(ratelimiter);
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("hey we hit a req method, request method is:", req.method);

//   next();
// });

const PORT = process.env.PORT;

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("app is running on port:", PORT);
  });
});
