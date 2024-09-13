import express from "express";
const router = express.Router();
import fetchAndStoreData from "../controler/fetchData.controller.js";
import getData from "../controler/topcryptos.controler.js";
router.get("/", fetchAndStoreData);
router.get("/getdata", getData);
export default router;
