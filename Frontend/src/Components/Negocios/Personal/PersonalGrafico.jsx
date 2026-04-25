import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from "react-i18next"; 

export default function PersonalGrafico( {response}) {
    const [data, setData] = useState([]);
    const {t} = useTranslation();
    useEffect(() => {
        const ObtenerDatos = async () => {
            try {
                const conteoCargos = response.reduce((acumulador, trabajador) => {
                    acumulador[trabajador.cargo] = (acumulador[trabajador.cargo] || 0) + 1;
                    return acumulador;
                }, {});

                const datosGrafico = Object.entries(conteoCargos).map(([cargo, cantidad]) => ({
                    cargo:t(cargo),
                    cantidad:t(cantidad),
                }));

                setData(datosGrafico);
            } catch (error) {
                console.error("Error al obtener los datos de trabajadores:", error);
            }
        };

        ObtenerDatos();
    }, [response, t]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { cargo, cantidad } = payload[0].payload;
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <p>{cargo}</p>
                    <p>{t("Cantidad")}: {cantidad}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <h3>{t("Número de Personal por Cargo")}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="cargo" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                    <Bar dataKey="cantidad">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    index === 0
                                        ? "rgba(135, 206, 235, 0.6)"
                                        : index === 1
                                        ? "rgba(255, 182, 193, 0.6)"
                                        : index === 2
                                        ? "rgba(144, 238, 144, 0.6)"
                                        : index === 3
                                        ? "rgba(255, 215, 0, 0.6)"
                                        : index === 4
                                        ? "rgba(255, 99, 132, 0.6)" 
                                        : "rgba(255, 165, 0, 0.6)"
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

