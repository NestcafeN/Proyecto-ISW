import { createTransport } from 'nodemailer';
import { User, Postulation } from './model';

// Configuración de transporte de correo electrónico (usando nodemailer)
const transporter = createTransport({
  service: 'Gmail', // Proveedor de correo electrónico
  auth: {
    user: '', // correo electrónico
    pass: '', // contraseña
  },
});

// Función para notificar al usuario sobre el estado de su postulación
async function notifyPostulationStatus(PostulacionId, status) {
  try {
    // Busca la postulación en la base de datos
    const Postulacion= await Postulacion.findByPk(PostulacionId, {
      include: [{ model: User, attributes: ['email'] }],
    });

    if (!Postulacion) {
      return false;
    }

    const { email } = Postulacion.User;

    // Crea el mensaje de correo electrónico
    const mailOptions = {
      from: '',
      to: email,
      subject: `Estado de tu postulación: ${status}`,
      text: `Tu postulación ha sido ${status}.`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


export default {
  notifyPostulationStatus,
};