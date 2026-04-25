import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PropiedadesGrafico from './PropiedadesGrafico';
import PropiedadesTabla2 from './PropiedadesTabla2';
import Loading from '../../../Pages/Loading';

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ListarPropiedad, ListarPropiedades, EliminarPropiedad, AñadirPropiedad, ActualizarPropiedad } from "../../../api/property.js";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from 'react-icons/fa';

const Propiedades = () => {
    const { t } = useTranslation();
    const [showLoading, setShowLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [open, setOpen] = useState(false);
    const [nuevaPropiedad, setNuevaPropiedad] = useState({
        nombre: '',
        clasificacion: '',
        tipo: '',
        ubicacion: '',
        distrito: '',
        estado: '',
        precio: '',
    });

    //Tabla para las propiedades - Columnas

    const columnas = [
        { field: "id", headerName: "ID", flex: 0.6, minWidth: 50 },
        { field: "nombre", headerName: t("NOMBRE"), flex: 1, minWidth: 100 },
        { field: "clasificacion", headerName: t("CLASIFICACIÓN"), flex: 1, minWidth: 100 },
        { field: "tipo", headerName: t("TIPO"), flex: 0.3, minWidth: 100 },
        { field: "ubicacion", headerName: t("UBICACIÓN"), flex: 0.8, minWidth: 50 },
        { field: "distrito", headerName: t("DISTRITO"), flex: 0.5, minWidth: 100 },
        {
            field: "estado", headerName: t("ESTADO"), flex: 0.5, minWidth: 100,
            renderCell: (params) => {
                const estado = params.row.estado;
                let color;
                if (estado === "Disponible") color = "#0d6f08";
                else if (estado === "Reservado") color = "#930303";
                else if (estado === "En proceso") color = "#6e5300";
                return (
                    <div style={{ color, fontWeight: "bold" }}>
                        {t(estado)}
                    </div>
                );
            },
        },
        {
            field: "precio", headerName: t("PRECIO"), flex: 0.2, minWidth: 80,
            renderCell: (params) => (
                <div style={{ fontWeight: "bold" }}>
                    ${params.row.precio.toLocaleString()}
                </div>
            ),
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


    // Cargar propiedades cuando el componente se monta
    useEffect(() => {
        const obtenerPropiedades = async () => {
            try {
                const response = await ListarPropiedades();
                const propiedades = response.data;
                const filasFormateadas = propiedades.map(propiedad => ({
                    id: propiedad.id,
                    nombre: propiedad.nombre,
                    clasificacion: propiedad.clasificacion,
                    tipo: propiedad.tipo,
                    ubicacion: propiedad.ubicacion,
                    distrito: propiedad.distrito,
                    estado: propiedad.estado,
                    precio: propiedad.precio
                }));
                setFilas(filasFormateadas);
            } catch (error) {
                console.error("Error al obtener las propiedades:", error);
            }
        };
        obtenerPropiedades();
    }, []);

    // Abrir y cerrar el formulario de agregar/editar
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setNuevaPropiedad({
            id: '',
            nombre: '',
            clasificacion: '',
            tipo: '',
            ubicacion: '',
            distrito: '',
            estado: '',
            precio: '',
        });
        setOpen(false);
    };


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaPropiedad((prev) => ({ ...prev, [name]: value }));
    };

    // Función para agregar una propiedad
    const handleAgregarPropiedad = async (accion) => {
        if (accion == "Agregar") {
            try {
                const response = await AñadirPropiedad(nuevaPropiedad);
                setFilas((prev) => [...prev, response.data]);
                handleClose();
            } catch (error) {
                console.error("Error al agregar la propiedad:", error);
            }
        } else {
            try {
                const response = await ActualizarPropiedad(nuevaPropiedad);
                setFilas(filas.filter((fila) => fila.id !== response.data.id));
                setFilas((prev) => [...prev, response.data]);
                handleClose();
            } catch (error) {
                console.error("Error al actualizar la propiedad:", error);
            }
        }
    };

    // Función para editar la propiedad
    const Editar = async (id) => {
        try {
            const propiedad = await ListarPropiedad(id); // Aquí obtenemos la propiedad
            setNuevaPropiedad({
                id: propiedad.data.id,
                nombre: propiedad.data.nombre,
                clasificacion: propiedad.data.clasificacion,
                tipo: propiedad.data.tipo,
                ubicacion: propiedad.data.ubicacion,
                distrito: propiedad.data.distrito,
                estado: propiedad.data.estado,
                precio: propiedad.data.precio
            });
            handleClickOpen(); // Abre el formulario
        } catch (error) {
            console.error("Error al obtener la propiedad para editar:", error);
        }
    };

    // Función para eliminar propiedad
    const Eliminar = (id) => {
        EliminarPropiedad(id);
        setFilas(filas.filter((fila) => fila.id !== id));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false); // Ocultar Loading después de 3 segundos (puedes ajustar el tiempo)
        }, 3000);

        const obtenerPropiedades = async () => {
            try {
                const response = await ListarPropiedades();
                const propiedades = response.data;
                const filasFormateadas = propiedades.map(propiedad => ({
                    id: propiedad.id,
                    nombre: propiedad.nombre,
                    clasificacion: propiedad.clasificacion,
                    tipo: propiedad.tipo,
                    ubicacion: propiedad.ubicacion,
                    distrito: propiedad.distrito,
                    estado: propiedad.estado,
                    precio: propiedad.precio
                }));
                setFilas(filasFormateadas);
            } catch (error) {
                console.error("Error al obtener las propiedades:", error);
            }
        };
        obtenerPropiedades();
        return () => clearTimeout(timer);
    }, []);
    return (
        <Grid container style={{ padding: "20px" }}>
            {/* Mostrar Loading mientras está en carga */}
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
                <h1 style={{ textAlign: "left" }}>{t("Propiedades")}</h1>
            </div>
            <div style={{ marginLeft: "78%", justifyContent: "start", alignItems: "flex-start"}}>               <Button onClick={handleClickOpen} >
                    <FaPlusCircle size={40} />
                    <span style={{
                        paddingLeft: '10px'
                    }}>{t("Nuevo")}
                    </span>
                </Button>
            </div>
            <Grid
                container
                spacing={4}
                sx={{ display: "flex", gap:"20px", alignItems: "stretch", justifyContent: "space-evenly" }}
            >
                {/* La tabla ocupa el 70% */}
                <Grid item xs={12} md={12} sx={{ margin: "10px 40px 0 30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px", display: "flex", alignItems: "center", height: 'auto' }}>
                    <Paper sx={{ height: "auto", width: "100%", padding: 2 }}>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{nuevaPropiedad.id ? t("Editar Propiedad") : t("Agregar Nueva Propiedad")}</DialogTitle>
                            <DialogContent>
                                <TextField label={t("Nombre")} name="nombre" value={nuevaPropiedad.nombre} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Clasificación")} name="clasificacion" value={nuevaPropiedad.clasificacion} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Tipo")} name="tipo" value={nuevaPropiedad.tipo} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Ubicación")} name="ubicacion" value={nuevaPropiedad.ubicacion} onChange={handleChange} fullWidth margin="normal" />
                                <TextField label={t("Distrito")} name="distrito" value={nuevaPropiedad.distrito} onChange={handleChange} fullWidth margin="normal" />
                                <FormControl fullWidth margin="normal">
                                    <FormLabel>{t("Estado")}</FormLabel>
                                    <RadioGroup name="estado" value={nuevaPropiedad.estado} onChange={handleChange} row>
                                        <FormControlLabel value="Disponible" control={<Radio />} label={t("Disponible")} />
                                        <FormControlLabel value="Reservado" control={<Radio />} label={t("Reservado")} />
                                        <FormControlLabel value="En proceso" control={<Radio />} label={t("En proceso")} />
                                    </RadioGroup>
                                </FormControl>
                                <TextField label={t("Precio")} name="precio" type="number" value={nuevaPropiedad.precio} onChange={handleChange} fullWidth margin="normal" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">{t("Cancelar")}</Button>
                                <Button onClick={() => handleAgregarPropiedad(nuevaPropiedad.id ? "Guardar cambios" : "Agregar")} color="primary">
                                    {nuevaPropiedad.id ? t("Guardar cambios") : t("Agregar")}
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
                            disableRowSelectionOnClick
                            checkboxSelection
                            sx={{ border: 0 }}
                            slotProps={{
                                pagination: { labelRowsPerPage: t("Filas a mostrar") },
                            }}
                        />
                    </Paper>

                </Grid>

                {/* El gráfico ocupa el 30% */}
                <Grid item xs={12} md={5.2} sx={{ margin: "10px ", minHeight: "200px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px", position: 'relative' }}>
                    <div style={{ width: '100%', height: '300px' }}>
                        <PropiedadesGrafico fila={filas} />
                    </div>
                </Grid>

                <Grid item xs={12} md={6} sx={{ margin: "10px ", height: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px" }}>
                    <PropiedadesTabla2 data={filas} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Propiedades;
