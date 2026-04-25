import axios from "./axios";

export const AñadirTrabajador = (personal) => axios.post("/personal", personal);

export const ListarTrabajadores = () => axios.get('/personal');

export const ListarTrabajador = (id) => axios.get(`/personal/${id}`);

export const EliminarTrabajador = (id) => axios.delete(`/personal/${id}`);

export const ActualizarTrabajadores = (personal) => axios.put(`/personal/${personal.id}`, personal)
