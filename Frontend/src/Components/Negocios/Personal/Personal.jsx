import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PersonalGrafico from './PersonalGrafico';
import PersonalTabla2 from './PersonalTabla2';
import Loading from '../../../Pages/Loading';

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IconButton } from "@mui/material";
import { ActualizarTrabajadores, AñadirTrabajador, EliminarTrabajador, ListarTrabajador, ListarTrabajadores } from "../../../api/personal";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from 'react-icons/fa';


const Personal = () => {
    const { t } = useTranslation();
    const [showLoading, setShowLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [open, setOpen] = useState(false);
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        id: "",
        nombre: "",
        cargo: "",
        desde: "",
        hasta: ""
    });
    const MostrarEmpleados = async () => {
        try {
            const response = (await ListarTrabajadores()).data;
            const empleados = response.map(empleado => {
                const fechaDesde = new Date();
                const fechaHasta = new Date(empleado.hasta);
    
                const fechaFormateadaDesde = isNaN(fechaDesde) ? 'Fecha no válida' : fechaDesde.toISOString().split('T')[0];
                const fechaFormateadaHasta = isNaN(fechaHasta) ? 'Fecha no válida' : fechaHasta.toISOString().split('T')[0];
    
                console.log(fechaFormateadaDesde, " ", fechaFormateadaHasta);
    
                const aniosDiferencia = fechaHasta.getFullYear() - fechaDesde.getFullYear();
                const mesesDiferencia = fechaHasta.getMonth() - fechaDesde.getMonth();
                const diffEnMeses = aniosDiferencia * 12 + mesesDiferencia;
    
                console.log(diffEnMeses);
    
                return {
                    id: empleado.id,
                    nombre: empleado.nombre,
                    cargo: t(empleado.cargo),
                    desde: fechaFormateadaDesde,
                    hasta: fechaFormateadaHasta,
                    tiempoCulminacion: diffEnMeses > 0
                        ? t('meses', { count: diffEnMeses })
                        : t('Contrato finalizado'),
                };
            });
    
            setFilas(empleados);  // Asegúrate de tener una función para actualizar el estado de las filas
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };
    

    useEffect(() => {
        MostrarEmpleados();
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    const columnas = [
        { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
        { field: "nombre", headerName: t("NOMBRE"), flex: 1, minWidth: 200 },
        { field: "cargo", headerName: t("CARGO"), flex: 1, minWidth: 150 },
        { field: "desde", headerName: t("DESDE"), flex: 1, minWidth: 150 },
        { field: "hasta", headerName: t("HASTA"), flex: 1, minWidth: 150 },
        { field: "tiempoCulminacion", headerName: t("CULMINACIÓN"), flex: 1, minWidth: 200 },
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


    const Editar = async (id) => {
        try {
            const response = (await ListarTrabajador(id)).data;
            setNuevoEmpleado({
                id: response.id,
                nombre: response.nombre,
                cargo: response.cargo,
                desde: (new Date(response.desde)).toISOString().split('T')[0],
                hasta: (new Date(response.hasta)).toISOString().split('T')[0]
            })
            handleClickOpen();
        } catch (error) {
            console.error('Error obteniendo los datos para actualziar: ' + error)
        }
    };

    const Eliminar = async (id) => {
        try {
            await EliminarTrabajador(id);
            MostrarEmpleados();
        } catch (error) {

        }
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoEmpleado({
            ...nuevoEmpleado,
            [name]: value,
        });
    };

    const handleAgregarEmpleado = async (accion) => {
        if (accion == "Agregar") {
            try {
                const response = await AñadirTrabajador(nuevoEmpleado);
                MostrarEmpleados();
                handleClose();
            } catch (error) {
                console.error("Error al agregar la propiedad:", error);
            }
        } else {
            try {
                const response = await ActualizarTrabajadores(nuevoEmpleado);
                MostrarEmpleados();
                handleClose();
            } catch (error) {
                console.error("Error al actualizar la propiedad:", error);
            }
        }
    };

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
                <h1 style={{ textAlign: "left" }}>{t("Personal")}</h1>
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
                {/* La tabla ocupa el 70% */}
                <Grid item xs={12} md={11.5} sx={{ margin: "10px", height: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px" }}>
                    <Paper sx={{ height: "auto", width: "100%", padding: 2 }}>
                        {/* Dialog de agregar o editar empleado */}
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{nuevoEmpleado.id ? t("Editar Personal") : t("Agregar Nuevo Personal")}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    label={t("Nombre")}
                                    name="nombre"
                                    value={nuevoEmpleado.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={t("Cargo")}
                                    name="cargo"
                                    value={nuevoEmpleado.cargo}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={t("Desde")}
                                    name="desde"
                                    type="date"
                                    value={nuevoEmpleado.desde}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label={t("Hasta")}
                                    name="hasta"
                                    type="date"
                                    value={nuevoEmpleado.hasta}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">{t("Cancelar")}</Button>
                                <Button onClick={() => handleAgregarEmpleado(nuevoEmpleado.id ? "Guardar cambios" : "Agregar")} color="primary">
                                    {nuevoEmpleado.id ? t("Guardar cambios") : t("Agregar")}
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* DataGrid con las filas de empleados */}
                        <DataGrid
                            rows={filas}
                            columns={columnas}
                            disableRowSelectionOnClick
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[10, 30]}
                            checkboxSelection
                            sx={{ border: 0 }}
                            slotProps={{
                                pagination: { labelRowsPerPage: t("Filas a mostrar") },
                            }}
                        />
                    </Paper>
                </Grid>

                {/* El gráfico ocupa el 30% */}
                <Grid item xs={12} md={7} sx={{ margin: "25px 30px", minHeight: "200px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "20px" }}>
                    <div style={{ width: '100%', height: 'auto' }}>
                        <PersonalGrafico response={filas} />
                    </div>
                </Grid>

                <Grid item xs={12} md={4} sx={{ margin: "25px 30px", height: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "40px" }}>
                    <PersonalTabla2 response={filas} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Personal;
