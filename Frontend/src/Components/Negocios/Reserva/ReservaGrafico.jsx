import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ListarReservas } from '../../../api/reservation';
import { useTranslation } from "react-i18next"; 

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

const Grafico01 = () => {
    const {t} = useTranslation();
    const [reservasPorMes, setReservasPorMes] = useState([]);
    const mesActual = new Date().getMonth();

    useEffect(() => {
        const obtenerReservas = async () => {
            try {
                const reservasContadas = new Array(mesActual + 1).fill(0);
                ((await ListarReservas()).data).forEach(reserva => {
                    const mes = (new Date(reserva.fecha)).getMonth();
                    if (mes <= mesActual) {
                        reservasContadas[mes] += 1;
                    }
                });

                setReservasPorMes(reservasContadas);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
            }
        };

        obtenerReservas();
    }, []);

    const labels = [t('Ene'), t('Feb'), t('Mar'), t('Abr'), t('May'), t('Jun'), t('Jul'), t('Ago'), t('Sep'), t('Oct'), t('Nov'), t('Dic')].slice(0, reservasPorMes.length);

    const data = {
        labels: labels,
        datasets: [
            {
                label: t('Reservas Totales'),
                data: reservasPorMes,
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                fill: false,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: t('Cantidad de Reservas'),
                },
                max: Math.max(...reservasPorMes) + 2,
            },
            x: {
                title: {
                    display: true,
                    text: t('Meses'),
                },
            },
        },
    };

    return (
        <div style={{
            marginTop: "70px"
        }}>
            <h2>{t("Reservas Mensuales")}</h2>
            <br></br>
            <br></br>
            <Line data={data} options={options} />
        </div>
    );
};

export default Grafico01;
