import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 

export default function PropiedadesTabla( {data} ) {
    const {t}=useTranslation();
    const columnas = [
        { field: "tipo", headerName: t("TIPO"), flex: 1, minWidth: 130 },
        { field: "reservados", headerName: t("DISPONIBLES"), flex: 1, minWidth: 150 },
        { field: "noReservados", headerName: t("RESERVADOS"), flex: 1, minWidth: 150 },
        { field: "enProceso", headerName: t("EN PROCESO"), flex: 1, minWidth: 150 }
    ];

    // Filas con datos ajustados
    const [filas, setFilas] = useState([]);

    useEffect(() => {
        const MostrarDatos = () => {
            try {
                // Inicializamos un objeto para almacenar los conteos por tipo
                const conteosPorTipo = {};
    
                // Recorrer las propiedades para contar los estados por tipo
                data.forEach((propiedad) => {
                    // Si no existe el tipo en el objeto, lo inicializamos
                    if (!conteosPorTipo[propiedad.tipo]) {
                        conteosPorTipo[propiedad.tipo] = { tipo: propiedad.tipo, reservados: 0, noReservados: 0, enProceso: 0, id: propiedad.id };
                    }
    
                    // Contamos según el estado de la propiedad
                    switch (propiedad.estado) {
                        case "Disponible":
                            conteosPorTipo[propiedad.tipo].reservados++;
                            break;
                        case "Reservado":
                            conteosPorTipo[propiedad.tipo].noReservados++;
                            break;
                        case "En proceso":
                            conteosPorTipo[propiedad.tipo].enProceso++;
                            break;
                        default:
                            break;
                    }
                });
    
                // Convertimos el objeto a un array para pasar a DataGrid
                const filasArray = Object.values(conteosPorTipo);
                const filasConTraduccion = filasArray.map((fila) => ({
                    ...fila,
                    tipo: t(fila.tipo), // Traducir el tipo de propiedad si es necesario
                    reservados: t(fila.reservados), // Puedes aplicar traducción también en los números si lo deseas
                    noReservados: t(fila.noReservados),
                    enProceso: t(fila.enProceso),
                  }));
                // Actualizamos el estado con los conteos
                setFilas(filasConTraduccion);
    
            } catch (error) {
                console.error("Error al obtener las propiedades:", error);
            }
        };
    
        MostrarDatos();
    }, [data,t]); // Incluye `data` como dependencia

    return (
        <Paper sx={{ height: "auto", width: "100%" }}>
            <DataGrid
                rows={filas}
                columns={columnas}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } } // Tamaño de página inicial
                }}
                pageSizeOptions={[5]} // Opciones de tamaño de página
                sx={{ border: 0 }}
                slotProps={{
                    pagination: { labelRowsPerPage: "Filas a mostrar" },
                }}
            />
        </Paper>
    );
}
