import axios from "./axios";

export const AñadirServicio = (service) => axios.post("/service", service);

export const ListarServicios = () => axios.get('/service');

export const ListarServicio = (id) => axios.get(`/service/${id}`);

export const EliminarServicio = (id) => axios.delete(`/service/${id}`);

export const ActualizarServicio = (service) => axios.put(`/service/${service.id}`, service)

