import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from "react-i18next"; 

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PropiedadesGrafico ( {fila} ) {
    const { t } = useTranslation();

    const [graficoData, setGraficoData] = useState([0, 0, 0]); 

    useEffect(() => {
        const obtenerDatos = async () => {
            try {

                // Inicializamos los contadores de propiedades por estado
                const conteosPorEstado = {
                    Disponible: 0,
                    Reservado: 0,
                    EnProceso: 0,
                };

                // Recorremos las propiedades y contamos los estados
                fila.forEach((propiedad) => {
                    switch (propiedad.estado) {
                        case 'Disponible':
                            conteosPorEstado.Disponible++;
                            break;
                        case 'Reservado':
                            conteosPorEstado.Reservado++;
                            break;
                        case 'En proceso':
                            conteosPorEstado.EnProceso++;
                            break;
                        default:
                            break;
                    }
                });

                // Actualizamos los datos del gráfico
                setGraficoData([
                    conteosPorEstado.Disponible,
                    conteosPorEstado.Reservado,
                    conteosPorEstado.EnProceso,
                ]);
            } catch (error) {
                console.error('Error al obtener las propiedades:', error);
            }
        };

        obtenerDatos(); // Llamamos a la función para cargar los datos al montar el componente
    }, [fila]);

    // Datos y opciones del gráfico
    const data = {
        labels: [t('Disponible'), t('Reservado'), t('En proceso')],
        datasets: [
            {
                label: 'Estado de Propiedades',
                data: graficoData, // Usamos los datos dinámicos
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Azul para Disponible
                    'rgba(255, 99, 132, 0.6)', // Rosa para Reservado
                    'rgba(255, 206, 86, 0.6)', // Amarillo para En Proceso
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Azul oscuro
                    'rgba(255, 99, 132, 1)', // Rosa oscuro
                    'rgba(255, 206, 86, 1)', // Amarillo oscuro
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <h2>{t("Estado de Propiedades")}</h2>
            <Pie data={data} options={options} />
        </div>
    );
};
