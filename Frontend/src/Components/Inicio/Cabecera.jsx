import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next"; 

export default function CabezeraVistaGeneral() {
    const theme = useTheme();

    const nombre = localStorage.getItem('nombre_usuario');
    const { t } = useTranslation();

    console.log(nombre);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',  // Asegura que los elementos estén en columna
                height: "auto",
                alignItems: 'flex-start', // Alinea a la izquierda
                backgroundColor: theme.palette.mode === 'dark' ? '1b1f2d' : '#ffff',
                p: 4,
                borderRadius: '8px',
            }}
        >
            {/* Título del Dashboard */}
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {t("Bienvenido")} {nombre}
            </Typography>

            {/* Texto adicional debajo del título */}
            <Typography variant="h6" sx={{ fontWeight: 100, mt: 1, width: "auto" }}> {/* mt: 1 añade un margen superior */}
                {t("Aquí encontraras todo los datos que necesitas para tener un negocio sumamente organizado con estadísticas")}
            </Typography>

            {/* Botones de acción */}

        </Box>
    );
}
