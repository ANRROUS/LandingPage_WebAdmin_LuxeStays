import React, { useEffect, useState } from 'react';
import ReseñaCarta from './ReseñaCarta';
import ReseñaGrafico from './ReseñaGrafico';
import { Grid, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Rating } from '@mui/material';
import { ActualizarReseña, AñadirReseña, EliminarReseña, ListarReseña, ListarReseñas } from "../../../api/review";
import Loading from '../../../Pages/Loading';
import { FaPlusCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next"; 

const Reseña = () => {
    const {t} = useTranslation();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false); // Ocultar Loading después de 3 segundos (puedes ajustar el tiempo)
        }, 1000);

        // Limpiar el timer al desmontar
        return () => clearTimeout(timer);
    }, []);
    const [reseñasData, setReseñasData] = useState([]);
    const [open, setOpen] = useState(false);
    const [nuevaReseña, setNuevaReseña] = useState({
        id: '',
        nombre: '',
        propiedad: '',
        comentario: '',
        fecha: '',
        estrellas: '',
        url: '',
    });

    const MostrarReseñas = async () => {
        const reseñas = (await ListarReseñas()).data;
        const ficha = reseñas.map(reseña => ({
            id: reseña.id,
            nombre: reseña.nombre,
            propiedad: reseña.propiedad,
            comentario: reseña.comentario,
            fecha: (new Date(reseña.fecha)).toISOString().split('T')[0],
            estrellas: reseña.estrellas,
            url: reseña.url
        }))
        setReseñasData(ficha);
    }

    useEffect(() => {
        MostrarReseñas();
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNuevaReseña({
            id: '',
            nombre: '',
            propiedad: '',
            comentario: '',
            fecha: '',
            estrellas: 0,
            url: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaReseña((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgregarReseña = async (accion) => {
        if (accion === "Agregar") {
            try {
                console.log(nuevaReseña);
                await AñadirReseña(nuevaReseña);
            } catch (error) {
                console.error("Error al agregar la reseña:", error);
            }
        } else {
            try {
                await ActualizarReseña(nuevaReseña);
            } catch (error) {
                console.error("Error al actualizar la reseña:", error);
            }
        }
        MostrarReseñas();
        handleClose();
    };

    return (
        <Box sx={{ padding: { xs: '8px', md: '16px', width: "100%" } }}>
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
            <div style={{ padding: '0 30px 0 40px', marginBottom: '16px', display: "flex", justifyContent: "space-between" }}>
                <h1>{t("Reseñas")}</h1>
                <Button onClick={handleOpen} >
                    <FaPlusCircle size={40}/>
                </Button>
            </div>

            <Grid container spacing={2} direction={{ xs: 'column', md: 'row' }} paddingLeft={5}>
                {/* Reseña */}
                <Grid item xs={12} md={12} padding={5}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                            <ReseñaGrafico reseñasData={reseñasData} />
                        </Grid>
                        {reseñasData.map((reseña, index) => (
                            <Grid item xs={12} sm={3} key={index}>
                                <ReseñaCarta reseña={reseña} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar Nueva Reseña</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Cliente"
                        name="nombre"
                        value={nuevaReseña.nombre}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Propiedad"
                        name="propiedad"
                        value={nuevaReseña.propiedad}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Comentario"
                        name="comentario"
                        value={nuevaReseña.comentario}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Fecha"
                        name="fecha"
                        type="date"
                        value={nuevaReseña.fecha}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Box sx={{ margin: '16px 0' }}>
                        <Typography variant="subtitle1">Calificación</Typography>
                        <Rating
                            name="estrellas"
                            onChange={(e, newValue) =>
                                setNuevaReseña((prev) => ({ ...prev, estrellas: newValue }))
                            }
                        />
                    </Box>
                    <TextField
                        label="URL de Imagen"
                        name="url"
                        value={nuevaReseña.url}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleAgregarReseña(nuevaReseña.id ? "Guardar cambios" : "Agregar")}
                        color="primary"
                    >
                        {nuevaReseña.id ? "Guardar cambios" : "Agregar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Reseña;