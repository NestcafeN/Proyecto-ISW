// Importa el módulo 'mongoose' para crear la conexión a la base de datos
const mongoose = require('mongoose');

// Agregamos la configuración de las variables de entorno
const { configEnv } = require('./configEnv.js');

// Obtiene las variables de entorno
const { DB_URL } = configEnv();

// Opciones de configuración para la conexión a la base de datos
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Conecta a la base de datos
mongoose.connect(DB_URL, options)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));
