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
import { SiGooglemessages } from "react-icons/si";
import { useTranslation } from "react-i18next"; 

// Creamos el estilo del contenedor "div"

const Demo = styled("div")(() => ({
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "8px",
}));


export default function InteractiveList({onItemCountChange}) {
    const [dense] = React.useState(false);
    const { t } = useTranslation();

    
    const [items, setItems] = React.useState([
        { 
            title: t("Cliente: Luis Fernández"), 
            secondary: t("Hola, estoy interesado en la propiedad 'Casa Vista Mar'. ¿Está disponible para enero?...") 
        },
        { 
            title: t("Cliente: María Torres"), 
            secondary: t("Buenos días, quisiera saber si puedo obtener un descuento por una reserva de 3 semanas...") 
        },
        { 
            title: t("Cliente: Pedro Alvarado"), 
            secondary: t("Hola, intenté reservar 'Apartamento Urbano', pero el sistema no me deja avanzar...") 
        },
        { 
            title: t("Cliente: Sofía Rivas"), 
            secondary: t("Buenas tardes, tengo dudas sobre los servicios incluidos en la 'Villa Esmeralda'...") 
        },
    ]);
    
    React.useEffect(() => {
        onItemCountChange(items.length);
    }, [items, onItemCountChange]);

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 800}}>
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
                                        <SiGooglemessages />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="h8">{item.title}</Typography>} // Cambiado: mayor legibilidad
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
