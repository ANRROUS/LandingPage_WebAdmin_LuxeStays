import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ListarClientes } from '../../../api/client.js';
import { useTranslation } from "react-i18next"; 

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ClienteGrafico ({clientes}) {
    const {t} = useTranslation();
    const mesActual = new Date().getMonth();
    const conteoMensual = Array(mesActual + 1).fill(0);
    const [clientesMensuales, setClientesMensuales] = useState(Array(conteoMensual).fill(0));

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                clientes.map(cliente => {
                    const fechaRegistro = new Date(cliente.fechaRegistro); 
                    const mes = fechaRegistro.getMonth(); 
                    conteoMensual[mes] += 1; 
                });

                setClientesMensuales(conteoMensual);
            } catch (error) {
                console.error('Error al listar clientes:', error);
            }
        };

        fetchClientes();
    }, [clientes]);

    const data = {
        labels: [t('Ene'), t('Feb'), t('Mar'), t('Abr'), t('May'), t('Jun'), t('Jul'), t('Ago'), t('Sep'), t('Oct'), t('Nov'), t('Dic')].slice(0, clientesMensuales.length),
        datasets: [
            {
                label: t('Clientes Mensuales'),
                data: clientesMensuales, 
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: t('Cantidad de Clientes'),
                },
                max: Math.max(...clientesMensuales) + 3,
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
        <div>
            <h2>{t("Clientes nuevos por mes")}</h2>
            <Line data={data} options={options} />
        </div>
    );
};
