import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { config } from 'dotenv';

// Obtiene la ruta absoluta del archivo .env
export const configEnv = () => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const envFilePath = resolve(dirname(currentFilePath), '.env');

  // Carga las variables de entorno desde el archivo .env
  config({ path: envFilePath });

  // Retorna un objeto con las variables de entorno
  return {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DB_URL: process.env.DB_URL,
  };
};
