import Reservations from "../models/reservations.model.js";

export const AñadirReserva = async (req, res) => {
    const { cliente,propiedad, fecha, estado } = req.body;
    try {
        const reservaExistente = await Reservations.findOne({
            cliente,
            propiedad,
            estado,
            fecha
        });

        if (reservaExistente) {
            return res.status(400).json({ mensaje: "Ya existe una reserva con los mismos datos" });
        }
        let id;
        //Crear id de la propiedad
        do {
            id = Math.floor(100000 + Math.random() * 900000);
        } while (!Reservations.findOne({ id }) == null);

        const newReservation = new Reservations({
            id,
            cliente,
            propiedad,
            estado,
            fecha
        });

        const ReservaGuardada = await newReservation.save();
        res.status(201).json(ReservaGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo añadir la reserva" });
    }
}

export const ListarReserva = async (req, res) => {
    try {
        const {id} = req.params;
        const ReservaEncontrada = await Reservations.findOne({id});
        if (!ReservaEncontrada) {
            return res.status(400).json({ mensaje: "Reserva no encontrada, ID incorrecta" });
        }
        return res.json(ReservaEncontrada);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

export const ListarReservas = async (req, res) => {

    const reservas = await Reservations.find();
    if (reservas.length == 0) {
        return res.status(404).json({ mensaje: "No hay reservas disponibles" });
    }
    return res.json(reservas);

}

export const EliminarReserva = async (req, res) => {

    const { id } = req.params;

    try {
        // Convertir el id recibido en un número (si es necesario)
        const reservaEliminada = await Reservations.findOneAndDelete({ id: Number(id) });

        if (!reservaEliminada) {
            return res.status(404).json({ message: "Reserva no encontrada con el ID proporcionado" });
        }

        res.status(200).json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ message: "Error al eliminar la reserva" });
    }

}

export const ActualizarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reservations.findOne({ id });

        if (!reserva) {
            return res.status(404).json({ mensaje: "Reserva no encontrada con ese id" });
        }

        const reservaActualizada = await Reservations.findOneAndUpdate(
            { id },  
            req.body,  
            { new: true }  
        );

        if (!reservaActualizada) {
            return res.status(400).json({ mensaje: "No se pudo actualizar la reserva" });
        }

        res.json(reservaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar la reserva"});
    }
};
