import mongoose from 'mongoose';
import { configEnv } from '../config/configEnv.js';

const { DB_URL } = configEnv;

const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
};

export const connectDB = async () => {
      try {
            console.log("Conectando con la base de datos en atlas...")
            const connection = await mongoose.connect(DB_URL, options);
            console.log("Conexión exitosa con la base de datos en atlas...")
            return connection;
      } catch (error) {
            console.log("Error en la conexión con la base de datos en atlas...")
            console.log(error);
      }
};