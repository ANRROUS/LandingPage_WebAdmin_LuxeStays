import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ListarServicios } from "../../../api/service";
import { useTranslation } from "react-i18next"; 

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ServiciosGrafico ({servicios}) {
    const {t} = useTranslation();
    const [datos, setDatos] = useState([]); // Estado inicial como un array vacío

    useEffect(() => {
        const ObtenerDatos = async () => {
            try {
                const contador = servicios.reduce((acc, servicio) => {
                    acc[servicio.nombre] = (acc[servicio.nombre] || 0) + 1;
                    return acc;
                }, {});

                // Convertir el objeto de conteo a un array de objetos
                const conteos = Object.entries(contador).map(([nombre, cantidad]) => ({
                    nombre,
                    cantidad,
                }));

                // Ordenar por cantidad descendente y tomar los 5 primeros
                const top5 = conteos.sort((a, b) => b.cantidad - a.cantidad).slice(0, 5);

                setDatos(top5); // Actualizar el estado con los 5 primeros
            } catch (error) {
                console.error("Error al listar servicios:", error);
            }
        };

        ObtenerDatos();
    }, [servicios]); // Ejecutar solo una vez al montar el componente

    // Preparar los datos para el gráfico
    const data = {
        labels: datos.map(item => t(item.nombre)), // Nombres de los servicios
        datasets: [
            {
                label: "Frecuencia de Servicios",
                data: datos.map(item => item.cantidad), // Cantidad de cada servicio
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9f40'], // Colores para las barras
            },
        ],
    };

    return (
        <div style={{
            marginTop: "40px"
        }}>
            <div className="chart-container">
                <Pie data={data} />
            </div>
            {/* Tabla de servicios con estilos aplicados */}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>{t("Servicio")}</th>
                        <th>{t("Uso")}</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato, index) => (
                        <tr key={index}>
                            <td>{t(dato.nombre)}</td>
                            <td>{dato.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

