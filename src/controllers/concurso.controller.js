import { Concurso } from '../models/concurso.model.js';

export async function getConcursos(req, res) {
      try {
            const concursos = await Concurso.find();
            res.status(200).json({ concursos });
      } catch (error) {
            res.status(500).json({ message: "Error al obtener los Concursos Creados" });
      }
}

export async function getConcurso(req, res) {
      try {
            const concurso = await Concurso.findById(req.params.id);
            if (!concurso) {
                  return res.status(404).json({ message: "Concurso no encontrado"});
            }
            res.status(200).json({ concurso });
      } catch (error) { 
            res.status(500).json({ message: "Error al obtener el Concurso" });
      }
}

export async function createConcurso(req, res) {
      try {
            const concurso = new Concurso({
                  nombre: req.body.nombre,
                  descripcion: req.body.descripcion,
                  tipo: req.body.tipo,
                  estado: req.body.estado,
                  postulaciones: req.body.postulaciones,
                  fechaAperturaConcurso: req.body.fechaAperturaConcurso,
                  fechaCierreConcurso: req.body.fechaCierreConcurso,
                  fechaAnuncioGanador: req.body.fechaAnuncioGanador,
            });
            const nuevoConcurso = await concurso.save();
            res.status(201).json(nuevoConcurso);
      } catch (error) {
            res.status(400).json({ message: "Error al crear Concurso" });
      }
}

export async function updateConcurso(req, res) {
      try {
            const concurso = await Concurso.findById(req.params.id);
                  if (!concurso) {
                        return res.status(404).json({ message: "Concurso no encontrado"});
                  }
            concursos.nombre = req.body.nombre;
            concursos.descripcion = req.body.descripcion;
            concursos.tipo = req.body.tipo;
            concursos.estado = req.body.estado;
            concursos.postulaciones = req.body.postulaciones;
            concursos.fechaAperturaConcurso = req.body.fechaAperturaConcurso;
            concursos.fechaCierreConcurso = req.body.fechaCierreConcurso;
            concursos.fechaAnuncioGanador = req.body.fechaAnuncioGanador;

                  const concursoActualizado = await concurso.save();
                        res.status(200).json(concursoActualizado);
      } catch (error) {
            res.status(400).json({message: "Error al actualizar Concurso"})
      }
}

export async function deleteConcurso(req, res) {
      try {
            const concurso = await Concurso.findById(req.params.id);

            if (!concurso) {
                  return res.status(404).json({ message: "Concurso no encontrado"});
            }
            await concurso.remove();
            res.status(200).json({ message: "Concurso eliminado correctamente"});
      } catch (error) {
            res.status(400).json({message: "Error al eliminar Concurso"})
      }
}
