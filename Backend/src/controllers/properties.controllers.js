import Properties from "../models/properties.model.js";

export const AñadirPropiedad = async (req, res) => {
    const { nombre, clasificacion, tipo, ubicacion, distrito, estado, precio } = req.body;
    try {
        const propiedadExistente = await Properties.findOne({
            nombre,
            clasificacion,
            tipo,
            ubicacion,
            distrito,
            estado,
            precio
        });

        if (propiedadExistente) {
            return res.status(400).json({ mensaje: "Ya existe una propiedad con los mismos datos" });
        }
        let id;
        //Crear id de la propiedad
        do {
            id = Math.floor(100000 + Math.random() * 900000);
        } while (!Properties.findOne({ id }) == null);

        const newPropiedad = new Properties({
            id,
            nombre,
            clasificacion,
            tipo,
            ubicacion,
            distrito,
            estado,
            precio
        });

        const PropiedadGuardada = await newPropiedad.save();
        res.status(201).json(PropiedadGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo añadir la propiedad" });
    }
}

export const ListarPropiedad = async (req, res) => {
    try {
        const {id} = req.params;
        const PropiedadEncontrada = await Properties.findOne({id});
        if (!PropiedadEncontrada) {
            return res.status(400).json({ mensaje: "Propiedad no encontrada, ID incorrecta" });
        }
        return res.json(PropiedadEncontrada);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}


export const ListarPropiedades = async (req, res) => {

    try {
        const propiedades = await Properties.find();
        return res.json(propiedades);
    } catch (error) {
        return res.status(404).json({ mensaje: "No hay propiedades disponibles" });
    }

}

export const EliminarPropiedad = async (req, res) => {

    const { id } = req.params;  // Obtener el id desde los parámetros de la solicitud

    try {
        // Convertir el id recibido en un número (si es necesario)
        const propiedadEliminada = await Properties.findOneAndDelete({ id: Number(id) });

        if (!propiedadEliminada) {
            return res.status(404).json({ message: "Propiedad no encontrada con el ID proporcionado" });
        }

        res.status(200).json({ message: "Propiedad eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la propiedad:", error);
        res.status(500).json({ message: "Error al eliminar la propiedad" });
    }

}

export const ActualizarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;

        const propiedad = await Properties.findOneAndUpdate({ id: Number(id) }, req.body, {
            new: true 
        });

        if (!propiedad) {
            return res.status(404).json({ mensaje: "Propiedad no encontrada con el ID manual" });
        }

        res.json(propiedad);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la propiedad", error: error.message });
    }
};
