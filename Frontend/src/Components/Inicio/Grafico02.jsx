import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { ListarPropiedades } from '../../api/property';
import { useTranslation } from "react-i18next"; 

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Grafico02 = () => {
    const { t } = useTranslation();

    const [datosTabla, setDatosTabla] = useState([]);
    const [dataGrafico, setDataGrafico] = useState(null);

    useEffect(() => {
        const ObtenerPropiedades = async () => {
            try {
                const response = await ListarPropiedades();
                const propiedades = response.data;

                // Agrupar propiedades por tipo
                const agrupadasPorTipo = propiedades.reduce((acc, propiedad) => {
                    const { tipo, precio } = propiedad;

                    // Si el tipo no existe, inicializarlo
                    if (!acc[tipo]) {
                        acc[tipo] = { sumaPrecios: 0, cantidad: 0 };
                    }

                    // Sumar precios y contar elementos
                    acc[tipo].sumaPrecios += precio;
                    acc[tipo].cantidad += 1;

                    return acc;
                }, {});

                // Calcular datos para la tabla y el gráfico
                const tabla = [];
                const etiquetas = [];
                const valores = [];

                for (const tipo in agrupadasPorTipo) {
                    const { sumaPrecios, cantidad } = agrupadasPorTipo[tipo];
                    const promedio = (sumaPrecios / cantidad).toFixed(2);

                    // Datos para la tabla
                    tabla.push({
                        tipo,
                        promedio,
                        sumaPrecios,
                    });

                    // Datos para el gráfico
                    etiquetas.push(t(tipo));
                    valores.push(promedio);
                }

                // Actualizar el estado con los datos
                setDatosTabla(tabla);
                setDataGrafico({
                    labels: etiquetas,
                    datasets: [
                        {
                            label: 'Promedio por Tipo',
                            data: valores,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error al obtener propiedades:", error);
            }
        };

        ObtenerPropiedades();
    }, []);

    return (
        <div>
            <h2>{t("Precios de Apartamentos por Tipo")}</h2>
            <div className="chart-container" style={{ maxWidth: '600px', margin: 'auto' }}>
                {dataGrafico && <Pie data={dataGrafico} />}
            </div>
            <table className="styled-table" >
                <thead>
                    <tr>
                        <th>{t("Tipo de Propiedad")}</th>
                        <th>{t("Promedio de Precios")}</th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map((item, index) => (
                        <tr key={index}>
                            <td>{t(item.tipo)}</td>
                            <td>${item.promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grafico02;
