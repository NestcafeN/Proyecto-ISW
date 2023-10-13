const mongoose = require('mongoose');
const { Postulacion } = require('./postulacion.model');

// Define el modelo de Notificación
const notificationSchema = new mongoose.Schema({
  tipo: String,
  mensaje: String,
  postulacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Postulacion,  // Referencia al modelo Postulacion
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  leida: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = {
  Notification,
};