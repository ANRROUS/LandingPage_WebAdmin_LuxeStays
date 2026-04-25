import axios from "./axios";

export const AñadirReserva = (reservation) => axios.post("/reservation", reservation);

export const ListarReservas = () => axios.get('/reservation');

export const ListarReserva = (id) => axios.get(`/reservation/${id}`);

export const EliminarReserva = (id) => axios.delete(`/reservation/${id}`);

export const ActualizarReserva = (reservation) => axios.put(`/reservation/${reservation.id}`, reservation)
