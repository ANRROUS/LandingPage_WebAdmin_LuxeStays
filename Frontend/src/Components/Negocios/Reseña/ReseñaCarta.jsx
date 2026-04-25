import React from 'react';
import { Box, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

const ReseñaCarta = ({ reseña }) => {
    const { nombre, propiedad, comentario, fecha, estrellas, url } = reseña;

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 3,
                color: '#000',
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '16px',
                margin: '16px auto',
                width: '100%',
                maxWidth: '400px',
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '@media (max-width: 600px)': {
                    padding: '12px',
                    height: 'auto', 
                },
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                gap: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '4px',
                padding: '2px 6px',
                zIndex: 1, 
            }}>
                {[...Array(5)].map((_, index) => (
                    <Star 
                        key={index} 
                        color={index < estrellas ? 'warning' : 'disabled'} 
                        fontSize="small" 
                    />
                ))}
            </Box>
            
            <Box sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                padding: '8px', 
                borderRadius: '8px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: '40px', 
            }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {nombre}
                </Typography>
                <Typography variant="subtitle1" component="h4">
                    Propiedad: {propiedad}
                </Typography>
                <Typography variant="body1" component="h2" sx={{ marginTop: '8px', flexGrow: 1, fontSize: "90%", color: "black" }}>
                    {comentario}
                </Typography>
                <Typography variant="caption" component="h2" sx={{ marginTop: '8px', display: 'block' }}>
                    Fecha: {fecha}
                </Typography>
            </Box>
        </Box>
    );
};

export default ReseñaCarta;
