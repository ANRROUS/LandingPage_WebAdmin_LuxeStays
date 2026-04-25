import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";

const ReseñaGrafico = ({ reseñasData }) => {
    const { t } = useTranslation();
    const calificaciones = [5, 4, 3, 2, 1].map((estrellas) => ({
        estrellas,
        cantidad: reseñasData.filter((reseña) => reseña.estrellas === estrellas).length,
    }));
    const legendFormatter = (value) => t(value);

    // Componente personalizado para el Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { estrellas, cantidad } = payload[0].payload;
            return (
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px',
                        textAlign: 'center',
                    }}
                >
                    <p>{estrellas}</p>
                    <p>{t("Cantidad")}: {cantidad}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={calificaciones}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="estrellas" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#f1c34f" name={t("Cantidad")} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReseñaGrafico;
