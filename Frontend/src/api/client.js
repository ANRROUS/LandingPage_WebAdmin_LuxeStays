import axios from "./axios";

export const AñadirCliente = (client) => axios.post("/client", client);

export const ListarClientes = () => axios.get('/client');

export const ListarCliente = (id) => axios.get(`/client/${id}`);

export const EliminarCliente = (id) => axios.delete(`/client/${id}`);

export const ActualizarCliente = (client) => axios.put(`/client/${client.id}`, client)
