import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ReservaGrafico from './ReservaGrafico';
import Loading from '../../../Pages/Loading';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ActualizarReserva, AñadirReserva, EliminarReserva, ListarReserva, ListarReservas } from "../../../api/reservation";
import { useTranslation } from "react-i18next";

import { FaPlusCircle } from "react-icons/fa";

const Reserva = () => {
    const { t } = useTranslation();
    const [showLoading, setShowLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [open, setOpen] = useState(false);
    const [nuevaReserva, setNuevaReserva] = useState({
        id: '',
        cliente: "",
        propiedad: "",
        fecha: new Date(),
        estado: "Confirmada",
    });

    const MostrarReservas = async () => {
        const response = await ListarReservas();
        const reservas_registradas = response.data;

        const reserva_nueva = reservas_registradas.map(reserva => {
            const fecha = new Date(reserva.fecha);
            const fechaFormateada = isNaN(fecha) ? 'Fecha no válida' : fecha.toISOString().split('T')[0];

            return {
                id: reserva.id,
                cliente: reserva.cliente,
                propiedad: reserva.propiedad,
                fecha: fechaFormateada,
                estado: reserva.estado
            };
        });

        setFilas(reserva_nueva);
    };

    useEffect(() => {
        MostrarReservas();
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    const Editar = async (id) => {
        try {
            const response = (await ListarReserva(id)).data;
            setNuevaReserva({
                id: response.id,
                cliente: response.cliente,
                propiedad: response.propiedad,
                fecha: response.fecha,
                estado: response.estado,
            });
            handleClickOpen();
        } catch (error) {
            console.error('Error en conseguir los datos para el servicio a actualizar: ' + error);
        }
    };

    const Eliminar = async (id) => {
        try {
            await EliminarReserva(id);
            setFilas(filas.filter((fila) => fila.id !== id));
        } catch (error) {
            console.error("Surgió un error al eliminar la reserva");
        }
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setNuevaReserva({
            id: '',
            cliente: '',
            propiedad: '',
            fecha: new Date(),
            estado: "Confirmada"
        });
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaReserva((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgregarReserva = async (accion) => {
        if (accion === "Agregar") {
            await AñadirReserva(nuevaReserva);
            MostrarReservas();
            handleClose();
        } else {
            await ActualizarReserva(nuevaReserva);
            MostrarReservas();
            handleClose();
        }
    };

    const columnas = [
        { field: "id", headerName: "ID", flex: 0.5, minWidth: 20 },
        { field: "cliente", headerName: t("CLIENTE"), flex: 1, minWidth: 100 },
        { field: "propiedad", headerName: t("PROPIEDAD"), flex: 1, minWidth: 100 },
        { field: "fecha", headerName: t("FECHA"), flex: 1, minWidth: 100 },
        {
            field: "estado", headerName: t("ESTADO"), flex: 1, minWidth: 150,
            renderCell: (params) => {
                const estado = params.row.estado;
                const color = estado === "Culminada" ? "#930303" : "#0d6f08";
                return (
                    <div style={{ color, fontWeight: "bold" }}>
                        {t(estado)}
                    </div>
                );
            },
        },
        {
            field: "acción",
            headerName: " ",
            flex: 0.5,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => Editar(params.row.id)}>
                        <FiEdit color="black" />
                    </IconButton>
                    <IconButton onClick={() => Eliminar(params.row.id)}>
                        <RiDeleteBin6Line color="black" />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Grid container style={{ padding: "20px" }}>
            {showLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'white',
                    zIndex: 1000
                }}>
                    <Loading />
                </div>
            )}
            <div style={{ margin: "0 0 40px 20px", width:"200px" }}>
                <h1>{t("Reservas")}</h1>
            </div>
            <div style={{ marginLeft: "78%", justifyContent: "start", alignItems: "flex-start" }}><Button onClick={handleClickOpen} >
                <FaPlusCircle size={40} />
                <span style={{
                    paddingLeft: '10px'
                }}>{t("Nuevo")}
                </span>
            </Button>
            </div>
            <Grid
                container
                spacing={3}
                sx={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}
            >
                {/* La tabla ocupa el 60% */}
                <Grid item xs={12} md={12} sx={{ margin: "10px 40px 0 30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px", display: "flex", alignItems: "center", height: 'auto' }}>
                    <Paper sx={{ height: "auto", width: "100%", padding: 2 }}>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{nuevaReserva.id ? t("Editar Reserva") : t("Agregar Nueva Reserva")}</DialogTitle>
                            <DialogContent>
                                <TextField label={t("Cliente")} name="cliente" value={nuevaReserva.cliente} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Propiedad")} name="propiedad" value={nuevaReserva.propiedad} onChange={handleChange} fullWidth margin="normal" />
                                <FormControl fullWidth margin="normal">
                                    <FormLabel>{t("Estado")}</FormLabel>
                                    <RadioGroup name="estado" value={nuevaReserva.estado} onChange={handleChange} row>
                                        <FormControlLabel value="En curso" control={<Radio />} label={t("En curso")} />
                                        <FormControlLabel value="Culminada" control={<Radio />} label={t("Culminada")} />
                                    </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">{t("Cancelar")}</Button>
                                <Button onClick={() => handleAgregarReserva(nuevaReserva.id ? "Guardar cambios" : "Agregar")} color="primary">
                                    {nuevaReserva.id ? t("Guardar cambios") : t("Agregar")}
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <DataGrid
                            rows={filas}
                            columns={columnas}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{ border: 0 }}
                            slotProps={{
                                pagination: { labelRowsPerPage: "Filas a mostrar" },
                            }}
                        />

                    </Paper>
                </Grid>
                {/* El gráfico ocupa el 40% */}
                <Grid item xs={12} md={11} sx={{ margin: "10px", height: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "10px" }}>
                    <ReservaGrafico reservas={filas} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Reserva;
