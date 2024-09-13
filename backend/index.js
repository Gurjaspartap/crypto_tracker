import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(cors());
import fetchData from "./routes/fetchData.js";
app.use("/fetchdata", fetchData);
import connectDb from "./utils/connectDb.js";
const port = process.env.PORT || 5000;
connectDb();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
