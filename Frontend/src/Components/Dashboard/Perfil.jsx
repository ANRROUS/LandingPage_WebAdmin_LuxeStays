import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";

import NotificacionesIconos from "./NotificacionesIconos";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from '../../Context/AuthContext';
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";


export default function Perfil() {
    const [anclaEl, setAnclaEl] = React.useState(null);
    const abierto = Boolean(anclaEl);
    const { logout } = useAuth();
    const { t } = useTranslation();

    const manejarClic = (event) => {
        setAnclaEl(event.currentTarget);
    };

    const manejarCerrar = () => {
        setAnclaEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center"}}>
                <NotificacionesIconos />
                <Tooltip title={t("Mi Perfil")}>
                    <IconButton
                        onClick={manejarClic}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={abierto ? "menu-cuenta" : undefined}
                        aria-haspopup="true"
                        aria-expanded={abierto ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, display: "flex", justifyContent: "center", alignItems: "center" }}>A</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anclaEl}
                id="menu-cuenta"
                open={abierto}
                onClose={manejarCerrar}
                onClick={manejarCerrar}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={manejarCerrar}>
                    <Avatar color="rgb(100, 100, 100)" /> {t("Perfil")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={manejarCerrar}>
                    <a
                        href="https://bookluxestays.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                    >
                        <ListItemIcon>
                            <IoMdHelpCircleOutline fontSize="25px" color="rgb(100, 100, 100)" />
                        </ListItemIcon>
                        {t("Ayuda")}
                    </a>
                </MenuItem>

                <MenuItem onClick={manejarCerrar}>
                    <ListItemIcon>
                        <IoLogOut fontSize="30px" color="rgb(100, 100, 100)" />
                    </ListItemIcon>
                    <Link style={{ color: "inherit", textDecoration: "none" }} to="/" onClick={() => {
                        logout();
                    }}>{t("Cerrar Sesión")}</Link>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
