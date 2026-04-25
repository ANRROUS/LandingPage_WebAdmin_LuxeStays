import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { ListarTrabajadores } from "../../../api/personal";
import { useTranslation } from "react-i18next"; 

export default function PersonalTabla2({response}) {
    const {t} = useTranslation();
    const columnas = [
        { field: "cargo", headerName: t("CARGO"), flex: 1, minWidth: 100 },
        { field: "conteo", headerName: t("CONTEO"), flex: 0.5, minWidth: 100 },
    ];

    const [filas, setFilas] = useState([]);

    useEffect(() => {
        const ObtenerDatos = async () => {
            try {

                const conteoCargos = response.reduce((acumulador, trabajador) => {
                    acumulador[trabajador.cargo] = (acumulador[trabajador.cargo] || 0) + 1;
                    return acumulador;
                }, {});

                const datosGrafico = Object.entries(conteoCargos).map(([cargo, cantidad], index) => ({
                    id: index,
                    cargo,
                    conteo: cantidad,
                }));

                setFilas(datosGrafico);
            } catch (error) {
                console.error("Error al obtener los datos de trabajadores:", error);
            }
        };

        ObtenerDatos();
    }, [response]);

    return (
        <Paper sx={{ height: "auto", width: "100%" }}>
            <DataGrid
                rows={filas}
                columns={columnas}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5]}
                sx={{ border: 0 }}
                slotProps={{
                    pagination: { labelRowsPerPage: "Filas a mostrar" },
                }}
            />
        </Paper>
    );
}
