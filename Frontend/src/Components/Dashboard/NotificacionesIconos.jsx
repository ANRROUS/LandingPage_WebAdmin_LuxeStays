import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Notificaciones from './notificaciones'; 
import Mensajes from './Mensajes';

// Iconos de notificaciones
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function NotificacionesIconos() {

    const [mostrarNotificaciones, setMostrarNotificaciones] = React.useState(false);
    const [mostrarMensajes, setMostrarMensajes] = React.useState(false);

    const [numeroNotificaciones, setNumeroNotificaciones] = React.useState(4);
    const [numeroMensajes, setNumeroMensajes] = React.useState(4);

    const manejarClickNotificaciones = () => {
        setMostrarNotificaciones(!mostrarNotificaciones);
        setMostrarMensajes(false);
    };

    const manejarClickMensajes = () => {
        setMostrarMensajes(!mostrarMensajes);
        setMostrarNotificaciones(false);
    };

    const handleItemCountChangeNotificaciones = (count) => {
        setNumeroNotificaciones(count);
    };

    const handleItemCountChangeMensajes = (count) => {
        setNumeroMensajes(count);
    };

    const notificacionesRef = React.useRef(null);
    const mensajesRef = React.useRef(null);
    const iconosRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {

            if (
                (notificacionesRef.current && notificacionesRef.current.contains(event.target)) ||
                (mensajesRef.current && mensajesRef.current.contains(event.target)) ||
                (iconosRef.current && iconosRef.current.contains(event.target))
            ) {
                return;
            }

            setMostrarNotificaciones(false);
            setMostrarMensajes(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex' }} ref={iconosRef}>
                    <IconButton
                        size="large"
                        aria-label={`mostrar ${numeroNotificaciones} nuevas notificaciones`}
                        color="inherit"
                        onClick={manejarClickNotificaciones}
                    >
                        <Badge badgeContent={numeroNotificaciones} color="error">
                            <IoMdNotificationsOutline />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label={`mostrar ${numeroMensajes} nuevos mensajes`}
                        color="inherit"
                        onClick={manejarClickMensajes}
                    >
                        <Badge badgeContent={numeroMensajes} color="error">
                            <FiMessageSquare />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>

            {mostrarNotificaciones && (
                <Box
                    ref={notificacionesRef}
                    sx={{
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        position: 'absolute',
                        top: '65px',
                        right: '20px',
                        width: '600px',
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        borderRadius: 2,
                        zIndex: 1300,
                        height: 'auto',
                        overflow: 'auto'
                    }}
                >
                    <Notificaciones onItemCountChange={handleItemCountChangeNotificaciones} />
                </Box>
            )}
            {mostrarMensajes && (
                <Box
                    ref={mensajesRef}
                    sx={{
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        position: 'absolute',
                        top: '65px',
                        right: '20px',
                        width: '600px',
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        borderRadius: 2,
                        zIndex: 1300,
                        height: 'auto',
                        overflow: 'auto',
                    }}
                >
                    <Mensajes onItemCountChange={handleItemCountChangeMensajes} />
                </Box>
            )}
        </div>
    );
}
