// Importa el archivo 'configEnv.js' para cargar las variables de entorno
import { configEnv } from './config/configEnv.js';

import indexRoutes from './routes/index.routes.js';

// Obtiene las variables de entorno
const { PORT } = configEnv();

// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
import './config/configDB.js';

// Importa el módulo 'express' para crear la aplicación web
import express, { json } from 'express';

// Crea una instancia de la aplicación
const app = express();

// Agrega el middleware para el manejo de datos en formato JSON
app.use(json());

app.use('/api', indexRoutes);
// Define una ruta para la página principal de la aplicación ('/')
// Esta ruta responde con un mensaje de "Hola Mundo" cuando se accede a ella
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Inicia el servidor web en el puerto 3000
// La función de callback muestra un mensaje en la consola indicando que el servidor está en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

