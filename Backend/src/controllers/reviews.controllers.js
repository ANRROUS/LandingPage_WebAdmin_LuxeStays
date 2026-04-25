import Reviews from "../models/reviews.model.js";

export const AñadirReseña = async (req, res) => {
    const { estrellas,nombre,propiedad,comentario,fecha, url } = req.body;
    try {
        const reseñaExistente = await Reviews.findOne({
            estrellas,
            nombre,
            propiedad,
            comentario,
            fecha
        });

        if (reseñaExistente) {
            return res.status(400).json({ mensaje: "Ya existe una reseña con los mismos datos" });
        }
        let id;
        //Crear id de la propiedad
        do {
            id = Math.floor(100000 + Math.random() * 900000);
        } while (!Reviews.findOne({ id }) == null);

        const newReseña = new Reviews({
            id,
            estrellas,
            nombre,
            propiedad,
            comentario,
            fecha, 
            url
        });

        const ReseñaGuardada = await newReseña.save();
        res.status(201).json(ReseñaGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo añadir la reseña" });
    }
}

export const ListarReseña = async (req, res) => {
    try {
        const {id} = req.params;
        const ReseñaEncontrada = await Reviews.findOne({id});
        if (!ReseñaEncontrada) {
            return res.status(400).json({ mensaje: "Propiedad no encontrada, ID incorrecta" });
        }
        return res.json(ReseñaEncontrada);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

export const ListarReseñas = async (req, res) => {

    const reseñas = await Reviews.find();
    if (reseñas.length === 0) {
        return res.status(404).json({ mensaje: "No hay reseñas disponibles" });
    }
    return res.json(reseñas);

}

export const EliminarReseña = async (req, res) => {

    const { id } = req.params;  // Obtener el id desde los parámetros de la solicitud

    try {
        // Convertir el id recibido en un número (si es necesario)
        const reseñaEliminada = await Reviews.findOneAndDelete({ id: Number(id) });

        if (!reseñaEliminada) {
            return res.status(404).json({ message: "Reseña no encontrada con el ID proporcionado" });
        }

        res.status(200).json({ message: "Reseña eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la reseña:", error);
        res.status(500).json({ message: "Error al eliminar la reseña" });
    }

}

export const ActualizarReseña = async (req, res) => {
    const { id } = req.params;

    try {
        const reseña = await Reviews.findOne({ id });

        if (!reseña) {
            return res.status(404).json({ mensaje: "Reseña no encontrada con ese id" });
        }

        const reseñaActualizada = await Reviews.findOneAndUpdate(
            { id },  
            req.body,  
            { new: true }  
        );

        if (!reseñaActualizada) {
            return res.status(400).json({ mensaje: "No se pudo actualizar la reseña" });
        }

        res.json(reseñaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar la reseña"});
    }
};
