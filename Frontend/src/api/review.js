import axios from "./axios";

export const AñadirReseña = (review) => axios.post("/review", review);

export const ListarReseñas = () => axios.get('/review');

export const ListarReseña = (id) => axios.get(`/review/${id}`);

export const EliminarReseña = (id) => axios.delete(`/review/${id}`);

export const ActualizarReseña = (review) => axios.put(`/review/${review.id}`, review)
