import Personal from "../models/personal.model.js";

export const AñadirTrabajador = async (req, res) => {
    const { nombre,cargo,desde,hasta } = req.body;
    try {
        const trabajadorExistente = await Personal.findOne({
            nombre,
            cargo,
            desde,
            hasta
        });

        if (trabajadorExistente) {
            return res.status(400).json({ mensaje: "Ya existe un trabajador con los mismos datos" });
        }
        let id;
        //Crear id de la propiedad
        do {
            id = Math.floor(100000 + Math.random() * 900000);
        } while (!Personal.findOne({ id }) == null);

        const newPersonal = new Personal({
            id,
            nombre,
            cargo,
            desde,
            hasta,
        });

        const TrabajadorGuardado = await newPersonal.save();
        res.status(201).json(TrabajadorGuardado);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo añadir el trabajador" });
    }
}

export const ListarTrabajador = async (req, res) => {
    try {
        const {id} = req.params;
        const TrabajadorEncontrado = await Personal.findOne({id});
        if (!TrabajadorEncontrado) {
            return res.status(400).json({ mensaje: "Trabajador no encontrado, ID incorrecta" });
        }
        return res.json(TrabajadorEncontrado);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

export const ListarTrabajadores = async (req, res) => {

    const trabajadores = await Personal.find();
    if (trabajadores.length === 0) {
        return res.status(404).json({ mensaje: "No hay trabajadores disponibles" });
    }
    return res.json(trabajadores);

}

export const EliminarTrabajador = async (req, res) => {

    const { id } = req.params;  // Obtener el id desde los parámetros de la solicitud

    try {
        // Convertir el id recibido en un número (si es necesario)
        const trabajadorEliminado = await Personal.findOneAndDelete({ id: Number(id) });

        if (!trabajadorEliminado) {
            return res.status(404).json({ message: "Trabajador no encontrado con el ID proporcionado" });
        }

        res.status(200).json({ message: "Trabajador eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ message: "Error al eliminar el trabajador" });
    }

}

export const ActualizarTrabajadores = async (req, res) => {
    const { id } = req.params;

    try {
        const trabajador = await Personal.findOne({ id });

        if (!trabajador) {
            return res.status(404).json({ mensaje: "Trabajador no encontrado con ese id" });
        }

        const trabajadorActualizado = await Personal.findOneAndUpdate(
            { id },  
            req.body,  
            { new: true }  
        );

        if (!trabajadorActualizado) {
            return res.status(400).json({ mensaje: "No se pudo actualizar el trabajador" });
        }

        res.json(trabajadorActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el trabajador"});
    }
};
