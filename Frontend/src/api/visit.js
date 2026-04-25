import axios from "./axios";

export const RegistrarVisita = (visit) => axios.post("/visit", visit);

export const ListarVisitas = () => axios.get('/visit');