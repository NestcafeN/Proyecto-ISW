// Importa el módulo 'express' para crear la aplicación web
const express = require('express');

// Crea una instancia de la aplicación
const app = express();

// Agrega el middleware para el manejo de datos en formato JSON
app.use(express.json());

// Define una ruta para la página principal de la aplicación ('/')
// Esta ruta responde con un mensaje de "Hola Mundo" cuando se accede a ella
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Inicia el servidor web en el puerto 3000
// La función de callback muestra un mensaje en la consola indicando que el servidor está en ejecución
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
