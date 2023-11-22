import {Postulacion} from '../models/postulacion.model.js';

export async function getPostulaciones(req, res) {
    try {
          const postulaciones = await postulaciones.find();
          res.status(200).json({ postulaciones });
    } catch (error) {
          res.status(500).json({ message: "Error al obtener las postulaciones ingresadas" });
    }
}

export async function getPostulacion(req, res) {
    try {
          const postulacion = await Postulacion.findById(req.params.id);
          if (!postulacion) {
                return res.status(404).json({ message: "Postulaciòn no encontrada"});
          }
          res.status(200).json({ Postulacion });
    } catch (error) { 
          res.status(500).json({ message: "Error al obtener la postulacion" });
    }
}

export async function createPostulacion(req, res) {
    try {
          const postulacion = new Postulacion({
                nombreCompleto: req.body.nombreCompleto,
                rut: req.body.rut,
                correo:req.body.correo,
                direccion: req.body.direccion,
                proyecto: req.body.proyecto,
                estado: req.body.estado,
                fechaPostulacion: req.body.fechaPostulacion,
          });
          const nuevaPostulacion = await postulacion.save();
          res.status(201).json(nuevaPostulacion);
    } catch (error) {
      console.log(error)
          res.status(400).json({ message: "Error al crear postulacion" });
    }
}

export async function updatePostulacion(req, res) {
    try {
          const postulacion = await Postulacion.findById(req.params.id);
                if (!Postulacion) {
                      return res.status(404).json({ message: "Postulacion no encontrada"});
                }
                postulacion.nombreCompleto= req.body.nombreCompleto,
                postulacion.rut= req.body.rut,
                postulacion.direccion= req.body.direccion,
                postulacion.proyecto= req.body.proyecto,
                postulacion.estado= req.body.estado,
                postulacion.fechaPostulacion= req.body.fechaPostulacion

                const postulacionActualizada = await postulacion.save();
                      res.status(200).json(concursoActualizado);
    } catch (error) {
          res.status(400).json({message: "Error al actualizar postulaciòn"})
    }
}

export async function deletePostulacion(req, res) {
    try {
          const postulacion = await Postulacion.findById(req.params.id);

          if (!postulacion) {
                return res.status(404).json({ message: "Postulaciòn no encontrado"});
          }
          await postulacion.remove();
          res.status(200).json({ message: "Postulaciòn eliminado correctamente"});
    } catch (error) {
          res.status(400).json({message: "Error al eliminar postulaciòn"})
    }
}