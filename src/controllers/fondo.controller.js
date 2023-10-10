import { Fondo } from '../models/fondo.model.js';

export async function getFondos(req, res) {
      try {
            const fondos = await Fondo.find();
            res.status(200).json({ fondos });
      } catch (error) {
            res.status(500).json({ message: "Error al obtener los Fondos" });
      }
}

export async function getFondo(req, res) {
      try {
            const fondo = await Fondo.findById(req.params.id);
            if (!fondo) {
                  return res.status(404).json({ message: "Fondo no encontrado"});
            }
            res.status(200).json({ fondo });
      } catch (error) {
            res.status(500).json({ message: "Error al obtener el Fondo" });
      }
}

export async function createFondo(req, res) {
      try {
            const fondo = new Fondo({
                  nombre: req.body.nombre,
                  descripcion: req.body.descripcion,
                  tipo: req.body.tipo,
                  monto: req.body.monto,
                  fechaApertura: req.body.fechaApertura,
                  fechaCierre: req.body.fechaCierre,
            });
            const nuevoFondo = await fondo.save();
            res.status(201).json(nuevoFondo);
      } catch (error) {
            res.status(400).json({ message: "Error al crear Fondo" });
      }
}

export async function updateFondo(req, res) {
      try {
            const fondo = await Fondo.findById(req.params.id);
            if (!fondo) {
                  return res.status(404).json({ message: "Fondo no encontrado"});
            }

            fondo.nombre = req.body.nombre;
            fondo.descripcion = req.body.descripcion;
            fondo.tipo = req.body.tipo;
            fondo.monto = req.body.monto;
            fondo.fechaApertura = req.body.fechaApertura;
            fondo.fechaCierre = req.body.fechaCierre;


            const fondoActualizado = await fondo.save();
                  res.status(200).json(fondoActualizado);
            } catch (error) {
                  res.status(400).json({message: "Error al actualizar Fondo"})
      }
}

export async function deleteFondo(req, res) {
      try {
            const fondo = await Fondo.findById(req.params.id);

            if (!fondo) {
                  return res.status(404).json({ message: "Fondo no encontrado"});
            }
            await fondo.remove();
            res.status(200).json({ message: "Fondo eliminado"});
      } catch (error) {
            res.status(400).json({ message: "Error al eliminar Fondo"});
      }
}
