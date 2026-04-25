import React, { useEffect, useState } from "react";
import { ListarClientes } from "../../api/client";
import { ListarPropiedades } from "../../api/property";
import { ListarReservas } from "../../api/reservation";
import { ListarVisitas } from "../../api/visit";
import styled from 'styled-components';
import { useTranslation } from "react-i18next"; 

const ContainerCard = styled.div`
width: 100%;
padding: 0 25px;
display: flex;
justify-content: space-between;
`;

const Card = styled.div`
background-color: #ffffff;
padding: 20px;
border-radius: 10px;
width: 23%;
color: #333;
margin: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.544);
transition: 0.3s;

&:hover {
  cursor: pointer;
  transform: scale(1.1);
}
`;

const CardHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const Tag = styled.div`
background-color: #e0d758;
color: black;
padding: 2px 8px;
border-radius: 5px;
font-size: 12px;
`;

const Sales = styled.div`
font-size: 48px;
font-weight: bold;
margin: 10px 0;
color: #333;
`;

const Change = styled.div`
display: flex;
align-items: center;
font-weight: bold;
`;

const ChangeDescription = styled.div`
color: #6c757d;
font-size: 14px;
right: 0;
width: 100%;
text-align: right;
`;

const PositiveChange = styled.span`
    color: green;
    font-weight: bold;
`;

const NegativeChange = styled.span`
    color: red;
    font-weight: bold;
`;

const getChangeClass = (change) => {
    return change.startsWith("-") ? NegativeChange : PositiveChange;
};

export default function Reportes() {

    const [clientes, setClientes] = useState(0);
    const [ingresos, setIngresos] = useState(0);
    const [reservas, setReservas] = useState(0);
    const [visita, setVisita] = useState(0);
    const [clientes_por, setClientes_Por] = useState(0);
    const [reservas_por, setReservas_Por] = useState(0);
    const [visita_por, setVisita_Por] = useState(0);
    const [span_reservas, setSpan_Reservas] = useState(false);
    const [span_clientes, setSpan_Clientes] = useState(false);
    const [span_visita, setSpan_Visita] = useState(false);
    const { t } = useTranslation();

    const obtenerClientes = async () => {
        let cli_mes_act = 0;
        let cli_mes_pas = 0;
        const mes_act = new Date().getMonth() + 1;
        const dia_act = new Date().getDate();
        const año = new Date().getFullYear();
        try {
            const fecha = ((await ListarClientes()).data).map(cliente => ({
                mes: cliente.fechaRegistro
            }));

            for (const fech of fecha) {
                const dia_cliente = Number(fech.mes.slice(8, 10));
                const mes_cliente = Number(fech.mes.slice(5, 7));
                const fecha_cliente = Number(fech.mes.slice(0, 4));
                if (fecha_cliente == año) {
                    if (dia_cliente >= 1 && dia_cliente <= dia_act && mes_cliente === mes_act) {
                        cli_mes_act++;
                    }
                    if (dia_cliente >= 1 && dia_cliente <= dia_act && mes_cliente === mes_act - 1) {
                        cli_mes_pas++;
                    }
                }
            }
            setClientes(cli_mes_act);
            if (cli_mes_pas === 0) {
                setClientes_Por(0);
                setSpan_Clientes(false);
            } else {
                setClientes_Por(Number(((cli_mes_act * 100) / cli_mes_pas) - 100).toFixed(2));
                setSpan_Clientes(true);
            }
        } catch (error) {
            console.error("Surgió un error al momento de obtener los clientes", error);
        }
    };

    const obtenerGanancias = async () => {
        let gan_mes_act = 0;
        try {
            ((await ListarPropiedades()).data).map(propiedad => {
                if (propiedad.estado == "Reservado") {
                    gan_mes_act += propiedad.precio;
                }
            })
            setIngresos(gan_mes_act);
        } catch (error) {
            console.error("Surgió un inconveniente obteniendo las ganancias des mes: " + error)
        }
    }

    const obtenerReservas = async () => {
        const mes = new Date().getMonth() + 1;
        const año = new Date().getFullYear();
        let num_reservas_act = 0;
        let num_reservas_pas = 0;
        try {
            ((await ListarReservas()).data).map(propiedad => {
                if (propiedad.estado) {
                    if ((propiedad.fecha).slice(0, 4) == año) {
                        if ((propiedad.fecha).slice(5, 7) == mes) {
                            num_reservas_act++;
                        }
                        if ((propiedad.fecha).slice(5, 7) == mes - 1) {
                            num_reservas_pas++;
                        }
                    }
                }
            })
            setReservas(num_reservas_act);
            if (num_reservas_pas == 0) {
                setReservas_Por(0);
                setSpan_Reservas(false);
            } else {
                setReservas_Por(Number(((num_reservas_act * 100) / num_reservas_pas) - 100).toFixed(2));
                setSpan_Reservas(true);
            }
        } catch (error) {
            console.error("Surgió un inconveniente obteniendo las reservas: " * error);
        }
    }

    const obtenerVisitas = async () => {
        const hora = new Date().getHours();
        const dia = new Date().getDate();
        const mes = new Date().getMonth() + 1;
        const año = new Date().getFullYear();

        const fechaUTC = new Date();

        const offsetPeru = -5 * 60;

        const fechaPeru = new Date(fechaUTC.getTime() + offsetPeru * 60 * 1000);

        const hace24Horas = new Date(fechaPeru.getTime() - 24 * 60 * 60 * 1000);

        let visitasUltimaHora = 0;

        try {
            const visitas = ((await ListarVisitas()).data);
            visitas.map(visita => {
                const hora_visit = parseInt(visita.visitDate.slice(11, 13));
                const dia_visit = parseInt(visita.visitDate.slice(8, 10));
                const mes_visit = parseInt(visita.visitDate.slice(5, 7));
                const año_visit = parseInt(visita.visitDate.slice(0, 4));

                if (año_visit == año && mes_visit == mes && dia_visit == dia && hora_visit == hora) {
                    visitasUltimaHora++;
                }

            });

            const visitasUltimas24Horas = visitas.filter(visita => {
                const fechaVisita = new Date(visita.visitDate);
                return fechaVisita >= hace24Horas && fechaVisita <= fechaPeru;
            });

            const visitasPorHora = Array(24).fill(0);
            visitasUltimas24Horas.forEach(visita => {
                const horaVisita = new Date(visita.visitDate).getHours();
                visitasPorHora[horaVisita]++;
            });

            const totalVisitas = visitasPorHora.reduce((acc, visitas) => acc + visitas, 0);
            const promedioVisitas = Number((totalVisitas - visitasUltimaHora) / 24).toFixed(2);
            setVisita(visitasUltimaHora)
            if (promedioVisitas == 0) {
                setVisita_Por(0);
                setSpan_Visita(false);
            } else {
                setVisita_Por(Number(((visitasUltimaHora * 100) / promedioVisitas) - 100).toFixed(2));
                setSpan_Visita(true);
            }
        } catch (error) {
            console.error("Error al conseguir la lista de visitas: " + error);
        }
    };

    useEffect(() => {

        const interval = setInterval(() => {
            obtenerVisitas();
            obtenerReservas();
            obtenerGanancias();
            obtenerClientes();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ContainerCard>
            <Card>
                <CardHeader>
                    <span>{t("Visitas")}</span>
                    <Tag>{t("Hora")}</Tag>
                </CardHeader>
                <Sales>{visita}</Sales>
                <Change>
                    {span_visita && (
                        getChangeClass(`${visita_por}%`) === PositiveChange ? (
                            <PositiveChange>{visita_por}%</PositiveChange>
                        ) : (
                            <NegativeChange>{visita_por}%</NegativeChange>
                        )
                    )}
                    <ChangeDescription>{t("desde las ultimas 24 horas")}</ChangeDescription>
                </Change>
            </Card>

            <Card>
                <CardHeader>
                    <span>{t("Clientes mes")}</span>
                    <Tag>{t("Mes")}</Tag>
                </CardHeader>
                <Sales>{clientes}</Sales>
                <Change>
                    {span_clientes && (
                        getChangeClass(`${clientes_por}%`) === PositiveChange ? (
                            <PositiveChange>{clientes_por}%</PositiveChange>
                        ) : (
                            <NegativeChange>{clientes_por}%</NegativeChange>
                        )
                    )}
                    <ChangeDescription>{t("desde las ultimas 24 horas")}</ChangeDescription>
                </Change>
            </Card>

            <Card>
                <CardHeader>
                    <span>{t("Ganancias totales")}</span>
                    <Tag>{t("Mes")}</Tag>
                </CardHeader>
                <Sales>${ingresos}</Sales>
                <Change>
                    <ChangeDescription>{t("desde el mes pasado")}</ChangeDescription>
                </Change>
            </Card>

            <Card>
                <CardHeader>
                    <span>{t("Reservas confirmadas")}</span>
                    <Tag>{t("Mes")}</Tag>
                </CardHeader>
                <Sales>{reservas}</Sales>
                <Change>
                    {span_reservas && (
                        getChangeClass(`${reservas_por}%`) === PositiveChange ? (
                            <PositiveChange>{reservas_por}%</PositiveChange>
                        ) : (
                            <NegativeChange>{reservas_por}%</NegativeChange>
                        )
                    )}
                    <ChangeDescription>{t("desde el mes pasado")}</ChangeDescription>
                </Change>
            </Card>
        </ContainerCard>
    );
}