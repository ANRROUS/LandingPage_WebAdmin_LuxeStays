import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ClienteGrafico from './ClienteGrafico';
import Loading from '../../../Pages/Loading';
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ListarCliente, ListarClientes, EliminarCliente, AñadirCliente, ActualizarCliente } from "../../../api/client.js";
import { useTranslation } from "react-i18next"; 
import { FaPlusCircle } from 'react-icons/fa';

const Clientes = () => {
    const {t} = useTranslation();
    const [showLoading, setShowLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [open, setOpen] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        numero: "",
        fechaRegistro: "",
    });

    const obtenerClientes = async () => {
        try {
            const response = await ListarClientes();
            const clientes = response.data;
            const filasFormateadas = clientes.map(cliente => ({
                id: cliente.id,
                nombre: cliente.nombre,
                numero: cliente.numero,
                fechaRegistro: (new Date(cliente.fechaRegistro)).toISOString().split('T')[0],
            }));
            setFilas(filasFormateadas);
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
        }
    };
    useEffect(() => {
        obtenerClientes();
        const timer = setTimeout(() => {
            setShowLoading(false); // Ocultar Loading después de 3 segundos (puedes ajustar el tiempo)
        }, 1000);

        // Limpiar el timer al desmontar
        return () => clearTimeout(timer);
    }, []);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setNuevoCliente({
            id: "",
            nombre: "",
            numero: "",
            fechaRegistro: "",
        });
        setOpen(false);
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoCliente((prev) => ({ ...prev, [name]: value }));
    };

    // Función para agregar o actualizar cliente
    const handleGuardarCliente = async (accion) => {
        if (accion === "Agregar") {
            try {
                await AñadirCliente(nuevoCliente);
                obtenerClientes();
                handleClose();
            } catch (error) {
                console.error("Error al agregar el cliente:", error);
            }
        } else {
            try {
                await ActualizarCliente(nuevoCliente);
                obtenerClientes();
                handleClose();
            } catch (error) {
                console.error("Error al actualizar el cliente:", error);
            }
        }
    };

    // Función para editar cliente
    const Editar = async (id) => {
        try {
            const cliente = await ListarCliente(id);
            setNuevoCliente({
                id: cliente.data.id,
                nombre: cliente.data.nombre,
                numero: cliente.data.numero,
                fechaRegistro: (new Date(cliente.data.fechaRegistro)).toISOString().split('T')[0],
            });
            handleClickOpen();
        } catch (error) {
            console.error("Error al obtener el cliente para editar:", error);
        }
    };

    // Función para eliminar cliente
    const Eliminar = (id) => {
        EliminarCliente(id);
        setFilas(filas.filter((fila) => fila.id !== id));
    };

    const columnas = [
        { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
        { field: "nombre", headerName: t("Nombre"), flex: 1, minWidth: 150 },
        { field: "numero", headerName: t("Número"), flex: 1, minWidth: 150 },
        { field: "fechaRegistro", headerName: t("Fecha de Registro"), flex: 1, minWidth: 150 },
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
                    zIndex: 1000,
                    color: "black"
                }}>
                    <Loading />
                </div>
            )}
            <div style={{ margin: "0 0 40px 20px", width:"200px" }}>
                <h1>{t("Clientes")}</h1>
            </div>
            <div style={{ marginLeft: "78%", justifyContent: "start", alignItems: "flex-start"}}>
                <Button onClick={handleClickOpen} >
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
                <Grid item xs={12} md={12} sx={{ margin: "10px 0 0 30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px", display: "flex", alignItems: "center", height: 'auto' }}>
                    <Paper sx={{ height: "auto", width: "100%", padding: 2 }}>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{nuevoCliente.id ? t("Editar Cliente") : t("Agregar Nuevo Cliente")}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    label={t("Nombre")}
                                    name="nombre"
                                    value={nuevoCliente.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={t("Número")}
                                    name="numero"
                                    value={nuevoCliente.numero}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={t("Fecha de Registro")}
                                    name="fechaRegistro"
                                    type="date"
                                    value={nuevoCliente.fechaRegistro}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">
                                    {t("Cancelar")}
                                </Button>
                                <Button
                                    onClick={() => handleGuardarCliente(nuevoCliente.id ? t("Guardar cambios") : t("Agregar"))}
                                    color="primary"
                                >
                                    {nuevoCliente.id ? t("Guardar cambios") : t("Agregar")}
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <DataGrid
                            rows={filas}
                            columns={columnas}
                            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                            pageSizeOptions={[10, 30]}
                            disableRowSelectionOnClick
                            sx={{ border: 0 }}
                            slotProps={{ pagination: { labelRowsPerPage: t("Filas a mostrar") } }}
                        />
                    </Paper>
                </Grid>
                {/* El gráfico ocupa el 40% */}
                <Grid item xs={12} md={12} sx={{ margin: "30px 0 0 30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "10px", height: 'auto' }}>
                    <ClienteGrafico clientes={filas} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Clientes;
