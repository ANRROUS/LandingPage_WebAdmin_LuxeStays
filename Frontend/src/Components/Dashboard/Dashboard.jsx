import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import CssBaseline from "@mui/material/CssBaseline";
import Perfil from "./Perfil";
import i18n from "./Idioma"; // Importa la configuración de idiomas
import { useTranslation } from "react-i18next"; // Importa el hook de traducción

import logo from "../../assets/logo.png";

// Iconos
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { TbLanguageHiragana } from "react-icons/tb";
import Inicio from "../Inicio/Inicio";
import { MdHomeWork } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import Propiedades from "../Negocios/Propiedades/Propiedades";
import Servicios from "../Negocios/Servicios/Servicios";
import Reserva from "../Negocios/Reserva/Reserva";
import Reseña from "../Negocios/Reseña/Reseña";
import Personal from "../Negocios/Personal/Personal";
import Clientes from "../ParaTi/Clientes/Clientes";
import styled from "styled-components";

const StyledSelect = styled("select")({
    padding: "0.5rem",
    borderRadius: "10px",
    margin: "0 0 0 10px",
    color: "black",
    border: "1px solid black",
    transition: "0.3s",
    "&:hover": {
        cursor: "pointer",
        transform: "scale(0.95)",
    },
});

// Estilo personalizado para el contenedor del select y el icono
const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
    "& li:hover, & button:hover": {
        cursor: "pointer",
        transform: "scale(0.95)",
    },
});

const NAVIGATION = [
    {
        kind: "header",
        title: "Home",
    },
    {
        segment: "vista-general",
        title: "General",
        icon: <MdHomeWork size="20px" />
    },
    {
        kind: "header",
        title: "Negocio",
    },
    {
        segment: "propiedades",
        title: "Propiedades",
        icon: <GiFamilyHouse />
    },
    {
        segment: "servicios",
        title: "Servicios",
        icon: <AssignmentIcon />
    },
    {
        segment: "reservas",
        title: "Reservas",
        icon: <EventIcon />
    },
    {
        segment: "personal",
        title: "Personal",
        icon: <PersonIcon />
    },
    {
        segment: "resena",
        title: "Reseñas",
        icon: <RateReviewIcon />
    },
    {
        kind: "header",
        title: "Para Ti",
    },
    {
        segment: "clientes",
        title: "Clientes",
        icon: <BsPeopleFill />
    }
];

function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {pathname === "/vista-general" && <Inicio />}
            {pathname === "/propiedades" && <Propiedades />}
            {pathname === "/servicios" && <Servicios />}
            {pathname === "/reservas" && <Reserva />}
            {pathname === "/personal" && <Personal />}
            {pathname === "/resena" && <Reseña />}
            {pathname === "/clientes" && <Clientes />}
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function Opciones() {
    const { t } = useTranslation();
    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
            }}
        >
            <Tooltip title={t("Cambiar idioma")} enterDelay={1000}>
                <StyledBox>
                    <TbLanguageHiragana fontSize="28px" />
                    <StyledSelect
                    style={{
                        padding: "10px 30px"
                    }}
                        onChange={handleLanguageChange}
                        defaultValue={i18n.language}
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </StyledSelect>
                </StyledBox>
            </Tooltip>
            <Perfil />
        </Box>
    );
}

function Dashboard(props) {
    const { window } = props;
    const [pathname, setPathname] = React.useState("/vista-general");
    const [loading, setShowLoading] = React.useState(true);
    const { t } = useTranslation();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const router = React.useMemo(() => {

        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <Box>
            <CssBaseline />
            <AppProvider
                navigation={NAVIGATION.map((nav) => ({
                    ...nav,
                    title: t(nav.title),
                }))}
                branding={{
                    logo: (
                        <img src={logo} alt="LuxeStays Logo" />
                    ),
                    title: "LuxeStays"
                }}
                router={router}
                window={demoWindow}
            >
                <DashboardLayout
                    slots={{
                        toolbarActions: () => (
                            <Box sx={{ display: "flex", alignItems: "flex-end"}}>
                                <Opciones />
                            </Box>
                        ),
                    }}
                >
                    <DemoPageContent pathname={pathname} />
                </DashboardLayout>
            </AppProvider>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
