import Visit from "../models/visitas.model.js"

// Registrar una nueva visita
export const RegistrarVisita = async (req, res) => {
    const { visitDate } = req.body;
    try {
        const newVisit = new Visit({
            visitDate
        });
        const visitaRegistrada = await newVisit.save();
        res.status(201).json(visitaRegistrada);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo registrar la visita" });
    }
}

// Listar todas las visitas registradas
export const ListarVisitas = async (req, res) => {
    try {
        const visitas = await Visit.find();
        if (visitas.length === 0) {
            return res.status(404).json({ mensaje: "No hay visitas registradas" });
        }
        return res.json(visitas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las visitas" });
    }
}
