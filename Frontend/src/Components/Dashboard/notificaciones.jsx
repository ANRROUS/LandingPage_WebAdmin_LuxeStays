// InteractiveList.jsx

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MdDeleteOutline } from "react-icons/md";
import { BiSolidMessageAdd } from "react-icons/bi";
import { useTranslation } from "react-i18next"; 

// Creamos el estilo del contenedor "div"
const Demo = styled("div")(() => ({
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "8px",
}));

export default function InteractiveList({ onItemCountChange }) {
    const [dense] = React.useState(false);
    const { t } = useTranslation();

    const [items, setItems] = React.useState([
        { 
            title: t("Nueva reserva confirmada"), 
            secondary: t("La propiedad 'Casa Playa Sol' ha sido reservada por el cliente Juan Pérez para el 10 de diciembre...") 
        },
        { 
            title: t("Pago recibido"), 
            secondary: t("Se recibió un pago de $500 por la reserva de 'Apartamento Urbano'...") 
        },
        { 
            title: t("Solicitud pendiente"), 
            secondary: t("El cliente Ana Gómez solicitó reservar 'Villa Esmeralda'. Pendiente de aprobación...") 
        },
        { 
            title: t("Mantenimiento programado"), 
            secondary: t("La propiedad 'Cabaña Montaña' tiene mantenimiento programado para el 15 de diciembre...") 
        },
    ]);

    // Actualizamos el número de notificaciones cuando el estado cambia
    React.useEffect(() => {
        onItemCountChange(items.length);  // Llamamos la función para pasar el número de notificaciones
    }, [items, onItemCountChange]);

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
            <Grid item xs={12} md={6}>
                <Demo>
                    <List dense={dense}>
                        {items.map((item, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                                        <MdDeleteOutline fontSize="30px" color="rgb(50, 50, 50)" />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <BiSolidMessageAdd />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="h8">{item.title}</Typography>} 
                                    secondary={item.secondary ? item.secondary : null}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Demo>
            </Grid>
        </Box>
    );
}
