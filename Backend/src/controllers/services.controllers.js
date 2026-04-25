import Services from "../models/services.model.js";

export const AñadirServicio = async (req, res) => {
    const { nombre,precio,duracion } = req.body;
    try {
        const servicioExistente = await Services.findOne({
            nombre,
            precio,
            duracion
        });

        if (servicioExistente) {
            return res.status(400).json({ mensaje: "Ya existe un servicio con los mismos datos" });
        }
        let id;
        //Crear id de la propiedad
        do {
            id = Math.floor(100000 + Math.random() * 900000);
        } while (!Services.findOne({ id }) == null);

        const newService = new Services({
            id,
            nombre,
            precio,
            duracion
        });

        const ServicioGuardado = await newService.save();
        res.status(201).json(ServicioGuardado);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo añadir el servicio" });
    }
}

export const ListarServicio = async (req, res) => {
    try {
        const {id} = req.params;
        const ServicioEncontrado = await Services.findOne({id});
        if (!ServicioEncontrado) {
            return res.status(400).json({ mensaje: "Servicio no encontrado, ID incorrecta" });
        }
        return res.json(ServicioEncontrado);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

export const ListarServicios = async (req, res) => {

    const servicios = await Services.find();
    if (servicios.length === 0) {
        return res.status(404).json({ mensaje: "No hay servicios disponibles" });
    }
    return res.json(servicios);

}

export const EliminarServicio = async (req, res) => {

    const { id } = req.params;  // Obtener el id desde los parámetros de la solicitud

    try {
        // Convertir el id recibido en un número (si es necesario)
        const servicioEliminado = await Services.findOneAndDelete({ id: Number(id) });

        if (!servicioEliminado) {
            return res.status(404).json({ message: "Servicio no encontrado con el ID proporcionado" });
        }

        res.status(200).json({ message: "Servicio eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
        res.status(500).json({ message: "Error al eliminar el servicio" });
    }

}

export const ActualizarServicio = async (req, res) => {
    const { id } = req.params;

    try {
        const servicio = await Services.findOne({ id });

        if (!servicio) {
            return res.status(404).json({ mensaje: "Servicio no encontrado con ese id" });
        }

        const servicioActualizado = await Services.findOneAndUpdate(
            { id },  
            req.body,  
            { new: true }  
        );

        if (!servicioActualizado) {
            return res.status(400).json({ mensaje: "No se pudo actualizar el servicio" });
        }

        res.json(servicioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el servicio"});
    }
};
