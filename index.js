import path from "path";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import cors from "cors"

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();


app.use(express.json());

connectDB();
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send('AUQHdJqXuPhMlUK8XdkyF_NxQGoMg384z_1wIXw679AfpldtvTtCl_2BZVz0wXyc1bMdxDhoxJRJH4NF')
);
app.get("/", (req, res) =>
  res.send('hello word')
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


app.use(notFound);
app.use(errorHandler);

const port = 4000;

app.listen(
  port,
  console.log(`server running  on port ${port}`)
);
