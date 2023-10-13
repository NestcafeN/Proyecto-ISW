const express = require('express');
const router = express.Router();
const { Postulation, Notification } = require('./model'); // Importa el modelo de Postulacion y Notificacion

// Ruta para obtener todas las notificaciones de un usuario
router.get('/notificaciones/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Busca todas las notificaciones relacionadas con el usuario
    const notificaciones = await Notification.find({ 'postulacion.usuario': userId });

    return res.status(200).json(notificaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener notificaciones.' });
  }
});

// Ruta para marcar una notificación como leída
router.put('/notificaciones/:notificationId', async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    // Encuentra y actualiza la notificación como leída
    const notification = await Notification.findByIdAndUpdate(notificationId, { leida: true });

    if (!notification) {
      return res.status(404).json({ error: 'Notificación no encontrada.' });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al marcar notificación como leída.' });
  }
});

module.exports = router;