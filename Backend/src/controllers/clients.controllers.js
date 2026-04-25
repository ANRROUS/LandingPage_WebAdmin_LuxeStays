import Client from "../models/clients.model.js";

export const AñadirCliente = async (req, res) => {
    const { nombre,numero,fechaRegistro } = req.body;
    try {
        const clienteExistente = await Client.findOne({
            nombre,
            numero,
            fechaRegistro
        });

        if (clienteExistente) {
            return res.status(400).json({ mensaje: "Ya existe un cliente con los mismos datos" });
        }
        let id;
        //Crear id de la propiedad
        do {
            id = Math.floor(100000 + Math.random() * 900000);
        } while (!Client.findOne({ id }) == null);

        const newClient = new Client({
            id,
            nombre,
            numero,
            fechaRegistro
        });

        const ClienteGuardado = await newClient.save();
        res.status(201).json(ClienteGuardado);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo añadir el cliente" });
    }
}

export const ListarCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const ClienteEncontrado = await Client.findOne({id});
        if (!ClienteEncontrado) {
            return res.status(400).json({ mensaje: "Cliente no encontrado, ID incorrecta" });
        }
        return res.json(ClienteEncontrado);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}

export const ListarClientes = async (req, res) => {

    const clientes = await Client.find();
    if (clientes.length === 0) {
        return res.status(404).json({ mensaje: "No hay clientes disponibles" });
    }
    return res.json(clientes);

}

export const EliminarCliente = async (req, res) => {

    const { id } = req.params;  // Obtener el id desde los parámetros de la solicitud

    try {
        // Convertir el id recibido en un número (si es necesario)
        const clienteEliminado = await Client.findOneAndDelete({ id: Number(id) });

        if (!clienteEliminado) {
            return res.status(404).json({ message: "Cliente no encontrado con el ID proporcionado" });
        }

        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ message: "Error al eliminar el cliente" });
    }

}

export const ActualizarCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Client.findOne({ id });

        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado con ese id" });
        }

        const clienteActualizado = await Client.findOneAndUpdate(
            { id },  
            req.body,  
            { new: true }  
        );

        if (!clienteActualizado) {
            return res.status(400).json({ mensaje: "No se pudo actualizar el cliente" });
        }

        res.json(clienteActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el cliente"});
    }
};
