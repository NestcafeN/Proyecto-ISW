"use strict";

import mongoose from "mongoose";
import { DB_URL } from "./configEnv.js";
import { handleError } from "../utils/errorHandler.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function setupDB() {
  try {
    await mongoose.connect(DB_URL, options);
    console.log("=> Conectado a la base de datos");
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}