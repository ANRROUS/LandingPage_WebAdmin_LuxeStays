import axios from "./axios";

export const AñadirPropiedad = (property) => axios.post("/property", property);

export const ListarPropiedades = () => axios.get('/property');

export const ListarPropiedad = (id) => axios.get(`/property/${id}`);

export const EliminarPropiedad = (id) => axios.delete(`/property/${id}`);

export const ActualizarPropiedad = (property) => axios.put(`/property/${property.id}`, property)

