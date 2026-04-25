import { Grid } from '@mui/material';
import Cabecera from './Cabecera'; // Asegúrate de que la ruta sea correcta
import Reportes from './Reportes'; // Asegúrate de que la ruta sea correcta
import Grafico01 from './Grafico01'; // Asegúrate de que la ruta sea correcta
import Grafico02 from './Grafico02';
import Loading from '../../Pages/Loading';
import React, { useState, useEffect } from 'react';

export default function Inicio() {
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 3000);

        // Limpiar el timer al desmontar
        return () => clearTimeout(timer);
    }, []);

    return (
        <Grid
            container
            spacing={4} // Espaciado entre los elementos
            justifyContent="space-between"
            alignItems="flex-start" // Ajusta la alineación vertical según sea necesario
            sx={{ height: '100vh' }} // Ocupar toda la altura de la ventana
        >
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
            <Grid item xs={4} md={12}> {/* Cambia xs={19} a xs={12} para ocupar el ancho completo */}
                <Cabecera />
            </Grid>
            <Grid item xs={4} md={12}>
                <Reportes />
            </Grid>
            <Grid item xs={4} md={7} sx={{ margin: "30px 10px 0 70px ", height: "650px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px", padding: "80px" }}>
                <Grafico01 />
            </Grid>
            <Grid item xs={4} md={4} sx={{ margin: "30px 30px 0 10px", padding: "20px 0 30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.544)", borderRadius: "20px" }}>
                <Grafico02 />
            </Grid>
            <Grid item xs={4} md={4}>
            </Grid>
        </Grid>
    );
}
