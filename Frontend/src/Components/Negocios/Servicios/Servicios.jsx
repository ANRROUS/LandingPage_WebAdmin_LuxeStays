import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ServiciosGrafico from './ServicioGrafico'; // Asegúrate de que esta ruta sea correcta
import Loading from '../../../Pages/Loading';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { AñadirServicio, ActualizarServicio, EliminarServicio, ListarServicio, ListarServicios } from "../../../api/service";
import { useTranslation } from "react-i18next"; 
import { FaPlusCircle } from 'react-icons/fa';

const Servicios = () => {
    const { t } = useTranslation();
    const [showLoading, setShowLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [open, setOpen] = useState(false);
    const [nuevoServicio, setNuevoServicio] = useState({
        id: '',
        nombre: '',
        precio: '',
        duracion: '',
    });

    useEffect(() => {
        const MostrarDatos = async () => {
            const datos = await ListarServicios();
            const servicios_registrados = datos.data;
            const servicio_registrado = servicios_registrados.map(dato => ({
                id: dato.id,
                nombre: dato.nombre,
                precio: dato.precio,
                duracion: dato.duracion
            }));
            setFilas(servicio_registrado);
        }
        MostrarDatos();
        const timer = setTimeout(() => {
            setShowLoading(false); // Ocultar Loading después de 3 segundos (puedes ajustar el tiempo)
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const Editar = async (id) => {
        try {
            const servicio_act = await ListarServicio(id);
            setNuevoServicio({
                id: servicio_act.data.id,
                nombre: servicio_act.data.nombre,
                precio: servicio_act.data.precio,
                duracion: servicio_act.data.duracion
            })
            handleClickOpen();
        } catch (error) {
            console.error('Error al obtener los datos del servicio a actualizar' + error);
        }
    };

    const Eliminar = (id) => {
        try {
            EliminarServicio(id);
            setFilas(filas.filter((fila) => fila.id !== id))
        } catch (error) {
            console.error("Error al eliminar el servicio" + error);
        }
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setNuevoServicio({
            id: '',
            nombre: '',
            precio: '',
            duracion: ''
        })
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoServicio((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgregarServicio = async (accion) => {
        if (accion == "Agregar") {
            try {
                console.log(nuevoServicio);
                const response = await AñadirServicio(nuevoServicio);
                setFilas((prev) => [...prev, response.data]);
                handleClose();
            } catch (error) {
                console.error("Error al agregar la propiedad:", error);
            }
        } else {
            try {
                console.log(nuevoServicio);
                const response = await ActualizarServicio(nuevoServicio);
                setFilas(filas.filter((fila) => fila.id !== response.data.id));
                setFilas((prev) => [...prev, response.data]);
                handleClose();
            } catch (error) {
                console.error("Error al actualizar la propiedad:", error);
            }
        }
    };

    const columnas = [
        { field: "id", headerName: "ID", flex: 0.8, minWidth: 50 },
        { field: "nombre", headerName: t("NOMBRE"), flex: 1, minWidth: 200 },
        {
            field: "precio",
            headerName: t("PRECIO"),
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <div style={{ fontWeight: "bold" }}>
                    ${params.row.precio.toLocaleString()}
                </div>
            ),
        },
        { field: "duracion", headerName: t("DURACIÓN"), flex: 1, minWidth: 100 },
        {
            field: "acción",
            headerName: " ",
            flex: 1,
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
        <Grid container style={{ height: "auto + 20px" }}>
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
                <h1>{t("Servicios")}</h1>
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
                <Grid item xs={12} md={6.5} sx={{ margin: "10px", height: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px", display: "flex", alignItems: "center" }}>
                    <Paper sx={{ height: "auto", width: "100%", padding: 2, display: "flex", flexDirection: "column" }}>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{nuevoServicio.id ? t("Editar Servicio") : t("Agregar Nuevo Servicio")}</DialogTitle>
                            <DialogContent>
                                <TextField label={t("Nombre")} name="nombre" value={nuevoServicio.nombre} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Precio")} name="precio" type="number" value={nuevoServicio.precio} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Duracion")} name="duracion" value={nuevoServicio.duracion} onChange={handleChange} fullWidth margin="normal" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">{t("Cancelar")}</Button>
                                <Button onClick={() => handleAgregarServicio(nuevoServicio.id ? "Guardar cambios" : "Agregar")} color="primary">
                                    {nuevoServicio.id ? t("Guardar cambios") : t("Agregar")}
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <DataGrid
                            rows={filas}
                            columns={columnas}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[10, 30]}
                            checkboxSelection
                            sx={{ border: 0, flexGrow: 1 }}
                            slotProps={{
                                pagination: { labelRowsPerPage: t("Filas a mostrar") },
                            }}
                        />
                    </Paper>
                </Grid>
                {/* El gráfico ocupa el 40% */}
                <Grid item xs={12} md={4.5} sx={{ margin: "10px", height: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "10px" }}>
                    <ServiciosGrafico servicios={filas} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Servicios;
