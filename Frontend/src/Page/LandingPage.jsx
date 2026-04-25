import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fontsource/poppins';
import { RegistrarVisita } from '../api/visit';

import imgLogo from "../assets/images/logo.png"
import inicio_imagen from "../assets/images/inicio_imagen.jpeg"
import propiedad1 from "../assets/images/url_de_imagen_1.jpg"
import propiedad2 from "../assets/images/url_de_imagen_2.jpg"
import propiedad3 from "../assets/images/url_de_imagen_3.jpg"
import propiedad4 from "../assets/images/url_de_imagen_4.jpg"
import propiedad5 from "../assets/images/url_de_imagen_5.jpg"
import propiedad6 from "../assets/images/url_de_imagen_6.jpg"

import imagen_negocio from "../assets/images/imagen_negocio.jpg"
import imagen_persona from "../assets/images/preguntas.jpg"

import imagen_bolsa from "../assets/images/bolsa.png"
import imagen_capacidad from "../assets/images/capacidad.png"
import imagen_comunidad from "../assets/images/comunidad.png"
import imagen_seguridad from "../assets/images/seguridad.png"

import imagen_ap from "../assets/images/app.png"
import imagen_wsp from "../assets/images/wsplogo.png"

import { Link } from 'react-router-dom';
const LandingPage = () => {
    useEffect(() => {
        const Registrar = async () => {
            const fechaUTC = new Date();

            const offsetPeru = -5 * 60;
            const fechaPeru = new Date(fechaUTC.getTime() + offsetPeru * 60 * 1000);

            await RegistrarVisita({ visitDate: fechaPeru });
        };
        document.documentElement.setAttribute("data-toolpad-color-scheme", "light");
        Registrar();
    }, []);
    return (
        <div>
            <header>
                <div>
                    <nav
                        className="navbar navbar-expand-lg navbar-light fixed-top"
                        style={{ backgroundColor: "#f8f9fa" }}
                    >
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <img
                                    src={imgLogo}
                                    alt="Logo"
                                    className="d-inline-block align-text-top logo"
                                    style={{ height: "50px", width: "auto", margin: "10px" }}
                                />
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup"
                                aria-controls="navbarNavAltMarkup"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#Inicio">
                                            Inicio
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#negocios">
                                            Para Negocios
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#fyhs">
                                            Para Ti
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#preguntas">
                                            Preguntas
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#descarga">
                                            Descarga
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <section
                id="Inicio"
                className="py-5"
                style={{
                    backgroundImage: `url(${inicio_imagen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    marginTop: '10px'
                }}
            >
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center" style={{ 'minHeight': '400px' }}>
                        <div className="col-md-6 text-center">
                            <div className="p-3" style={{ 'backgroundColor': 'rgba(0, 0, 0, 0.5)', 'borderRadius': '10px' }}>
                                <h2 className="text-warning">
                                    Desbloquea el lujo con cada estadía
                                </h2>
                                <p className="mt-3">
                                    LUXESTAYS te ofrece más que una simple reserva. Acumula puntos en cada estadía y
                                    canjéalos por noches gratis, upgrades de habitación, tratamientos de spa y mucho más.
                                    Personaliza tu experiencia y crea recuerdos inolvidables con nuestro programa de
                                    recompensas.
                                </p>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#videoModal">
                                    Ver Video
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="videoModalLabel">
                                Conocenos
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/ROhQ79d-uNU"
                                title="Video de LuxeStays"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <aside className="container py-5">
                <article className="negocios" id="negocios">
                    <h2 className="text-warning text-center mb-4">
                        ¿Por qué elegir Luxe Stays?
                    </h2>
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center mb-3 mb-md-0">
                            <img
                                src={imagen_negocio}
                                alt="Imagen de Luxe Stays"
                                className="img-fluid rounded"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>
                        <div className="col-md-6">
                            <p className="fs-5 text-justify">
                                Para sus necesidades de vacaciones o viajes de negocios en el área del
                                Valle Central, Luxe Stays ofrece alojamientos boutique de lujo. Nuestro
                                equipo profesional está disponible los siete días de la semana para
                                garantizar que se cumplan todas sus expectativas mientras se hospeda en
                                nuestro impresionante portafolio de destinos turísticos.
                            </p>
                        </div>
                    </div>
                    <section className="mt-4 text-center">
                        <p className="fs-5">
                            ¿Deseas adquirir alguna propiedad?
                        </p>
                        <button
                            className="btn btn-warning fw-bold text-dark"
                            onClick={() => (location.href = "#form")}
                        >
                            Regístrate
                        </button>
                    </section>
                </article>
                <article className="solicitud mt-5" id="form">
                    <h3 className="text-warning text-center mb-4">
                        Regístrate y espera la solicitud para adquirir una de nuestras propiedades
                    </h3>
                    <form className="p-4 rounded border border-warning">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="nombre" className="form-label font-semibold">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    placeholder="Ingresa tu nombre"
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="apellido" className="form-label font-semibold">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    id="apellido"
                                    className="form-control"
                                    placeholder="Ingresa tu apellido"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label font-semibold">Género:</label>
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="form-check me-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="genero"
                                        id="masculino"
                                        value="masculino"
                                    />
                                    <label className="form-check-label" htmlFor="masculino">
                                        Masculino
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="genero"
                                        id="femenino"
                                        value="femenino"
                                    />
                                    <label className="form-check-label" htmlFor="femenino">
                                        Femenino
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label font-semibold">
                                    Correo de contacto
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Ingresa tu correo"
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="telefono" className="form-label font-semibold">
                                    Teléfono de contacto
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    className="form-control"
                                    placeholder="Ingresa tu teléfono"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="detalles" className="form-label font-semibold">
                                Detalles adicionales
                            </label>
                            <textarea
                                id="detalles"
                                className="form-control"
                                rows="4"
                                placeholder="Escribe tus detalles aquí"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning fw-bold text-dark">
                                Enviar solicitud
                            </button>
                        </div>
                    </form>
                </article>

                <article className="fy mt-5" id="fyhs">
                    <h2 className="text-warning text-center mb-4">
                        Descubre Propiedades
                    </h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <a href="#" className="text-decoration-none">
                                <div className="property-card bg-secondary p-3 rounded h-100 d-flex flex-column justify-content-between">
                                    <div className="img-container ratio ratio-4x3 mb-2 bg-dark rounded">
                                        <img src={propiedad1} alt="Propiedad 1" className="img-fluid rounded" />
                                    </div>
                                    <div>
                                        <p className="text-warning fw-bold mb-1">
                                            Sacramento Retreat Home
                                        </p>
                                        <p className="text-white mb-1">
                                            | Piscina | Fogón | Garaje
                                        </p>
                                        <p className="text-white mb-0">
                                            Ubicación: Sacramento County, California, EE.UU.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 mb-4">
                            <a href="#" className="text-decoration-none">
                                <div className="property-card bg-secondary p-3 rounded h-100 d-flex flex-column justify-content-between">
                                    <div className="img-container ratio ratio-4x3 mb-2 bg-dark rounded">
                                        <img src={propiedad2} alt="Propiedad 2" className="img-fluid rounded" />
                                    </div>
                                    <div>
                                        <p className="text-warning fw-bold mb-1">
                                            Luxe Getaway House
                                        </p>
                                        <p className="text-white mb-1">
                                            | Piscina Privada | Jardín Secreto | Wi-Fi Gratis
                                        </p>
                                        <p className="text-white mb-0">
                                            Ubicación: San Francisco, California, EE.UU.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 mb-4">
                            <a href="#" className="text-decoration-none">
                                <div className="property-card bg-secondary p-3 rounded h-100 d-flex flex-column align-items-start">
                                    <div className="img-container ratio ratio-4x3 mb-2 bg-dark rounded">
                                        <img src={propiedad3} alt="Propiedad 3" className="img-fluid rounded" />
                                    </div>
                                    <div>
                                        <p className="text-warning fw-bold mb-1">
                                            Charming Cottage
                                        </p>
                                        <p className="text-white mb-1">
                                            | Vista al Lago | Ideal para Familias | Cocina Equipada
                                        </p>
                                        <p className="text-white mb-0">
                                            Ubicación: Lake Tahoe, California, EE.UU.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 mb-4">
                            <a href="#" className="text-decoration-none">
                                <div className="property-card bg-secondary p-3 rounded h-100 d-flex flex-column justify-content-between">
                                    <div className="img-container ratio ratio-4x3 mb-2 bg-dark rounded">
                                        <img src={propiedad4} alt="Propiedad 4" className="img-fluid rounded" />
                                    </div>
                                    <div>
                                        <p className="text-warning fw-bold mb-1">
                                            Stylish Urban Loft
                                        </p>
                                        <p className="text-white mb-1">
                                            | Estilo Moderno | Acceso a Transporte Público | Balcón
                                        </p>
                                        <p className="text-white mb-0">
                                            Ubicación: Los Ángeles, California, EE.UU.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 mb-4">
                            <a href="#" className="text-decoration-none">
                                <div className="property-card bg-secondary p-3 rounded h-100 d-flex flex-column justify-content-between">
                                    <div className="img-container ratio ratio-4x3 mb-2 bg-dark rounded">
                                        <img src={propiedad5} alt="Propiedad 5" className="img-fluid rounded" />
                                    </div>
                                    <div>
                                        <p className="text-warning fw-bold mb-1">
                                            Beachfront Paradise
                                        </p>
                                        <p className="text-white mb-1">
                                            | Acceso Directo a la Playa | Barbacoa | Vista al Mar
                                        </p>
                                        <p className="text-white mb-0">
                                            Ubicación: Santa Mónica, California, EE.UU.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-4 mb-4">
                            <a href="#" className="text-decoration-none">
                                <div className="property-card bg-secondary p-3 rounded h-100 d-flex flex-column align-items-start">
                                    <div className="img-container ratio ratio-4x3 mb-2 bg-dark rounded">
                                        <img src={propiedad6} alt="Propiedad 6" className="img-fluid rounded" />
                                    </div>
                                    <div>
                                        <p className="text-warning fw-bold mb-1">
                                            Luxury Family Retreat
                                        </p>
                                        <p className="text-white mb-1">
                                            | Jardín Amplio | Sala de Juegos | Spa Privado
                                        </p>
                                        <p className="text-white mb-0">
                                            Ubicación: Napa Valley, California, EE.UU.
                                        </p>
                                        <p className="text-white small mb-0">
                                            Relájate y disfruta de un fin de semana inolvidable con tu familia.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </article>
                <div id="preguntas" className="container mt-6">
                    <h2 className="text-center h1 text-warning mb-4">Preguntas Frecuentes</h2>
                    <div className="row">
                        <div className="col-md-7">
                            <div id="faqAccordion" className="accordion">
                                <div className="card mb-3">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button
                                                className="btn text-dark w-100 text-start"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                ¿Cuál es el horario de atención?
                                            </button>
                                        </h5>
                                    </div>
                                    <div
                                        id="collapseOne"
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="card-body small">
                                            Nuestro equipo profesional está disponible los siete días de la semana para garantizar que se cumplan
                                            todas sus expectativas durante su estadía en nuestra impresionante cartera de destinos de viaje.
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button
                                                className="btn text-dark w-100 text-start"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                ¿Qué te ofrece Luxe Stays?
                                            </button>
                                        </h5>
                                    </div>
                                    <div
                                        id="collapseTwo"
                                        className="collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="card-body small">
                                            El tiempo es esencial. Así es como garantizamos una perfecta experiencia de principio a fin.
                                            <div className="mt-4">
                                                <h2 className="text-primary mb-3 text-warning">Servicios Ofrecidos</h2>
                                                <div className="row">
                                                    <div className="col-12 col-md-4 mb-4">
                                                        <h3 className="text-dark text-sm">Incorporación simplificada</h3>
                                                        <ul className="list-group small">
                                                            <li className="list-group-item">Proceso de incorporación controlado por el propietario</li>
                                                            <li className="list-group-item">Tours virtuales en 3D de las casas</li>
                                                            <li className="list-group-item">Redacción personalizada</li>
                                                            <li className="list-group-item">Escritura personalizada</li>
                                                            <li className="list-group-item">Listado optimizado de primer nivel</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-12 col-md-4 mb-4">
                                                        <h3 className="text-dark text-sm">Cuidado en los detalles</h3>
                                                        <ul className="list-group small">
                                                            <li className="list-group-item">Tecnología para precios dinámicos</li>
                                                            <li className="list-group-item">Limpieza periódica y experta</li>
                                                            <li className="list-group-item">Proporcionar las comodidades para los visitantes</li>
                                                            <li className="list-group-item">Procesamiento de pagos</li>
                                                            <li className="list-group-item">Inspección de visitantes y cobertura de daños</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-12 col-md-4 mb-4">
                                                        <h3 className="text-dark text-sm">Cuidando a nuestro cliente</h3>
                                                        <ul className="list-group small">
                                                            <li className="list-group-item">Retenciones de propiedad ilimitada</li>
                                                            <li className="list-group-item">Sin acuerdos establecidos</li>
                                                            <li className="list-group-item">Empleados locales en cada mercado</li>
                                                            <li className="list-group-item">Mantenimiento e inspecciones de rutina</li>
                                                            <li className="list-group-item">Asistencia con permisos e impuestos</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button
                                                className="btn text-dark w-100 text-start"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                ¿Cuáles son los beneficios para los propietarios de las viviendas?
                                            </button>
                                        </h5>
                                    </div>
                                    <div
                                        id="collapseThree"
                                        className="collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="card-body small">
                                            <div className="container mt-4">
                                                <h2 className="text-center">Beneficios para propietarios de viviendas</h2>
                                                <div className="row mt-4">
                                                    <div className="col-12 col-md-6 mb-4">
                                                        <img src={imagen_bolsa} className="img-fluid rounded mb-2" alt="Imagen 1" />
                                                        <p>Gestión de ingresos ejemplar. Utilice nuestros programas adaptables para optimizar sus ingresos.</p>
                                                    </div>
                                                    <div className="col-12 col-md-6 mb-4">
                                                        <img src={imagen_capacidad} className="img-fluid rounded mb-2" alt="Imagen 2" />
                                                        <p>Fuertes capacidades de distribución en más de 50 canales de distribución.</p>
                                                    </div>
                                                    <div className="col-12 col-md-6 mb-4">
                                                        <img src={imagen_seguridad} className="img-fluid rounded mb-2" alt="Imagen 3" />
                                                        <p>Total seguridad y cuidado con dispositivos inteligentes para detectar ruidos y otros riesgos.</p>
                                                    </div>
                                                    <div className="col-12 col-md-6 mb-4">
                                                        <img src={imagen_comunidad} className="img-fluid rounded mb-2" alt="Imagen 4" />
                                                        <p>Asociados de la comunidad, cuidamos su casa como propia y trabajamos con los vecinos.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 d-flex align-items-center justify-content-center mb-4 mb-md-0">
                            <img src={imagen_persona} className="img-fluid w-100 rounded" alt="Imagen de una persona" />
                        </div>
                    </div>
                </div>


                <br></br>
                <div id="descarga" />
                <br></br>
                <div className="container mt-5">
                    <h2 className="text-center">
                        Descarga Nuestra Aplicación
                    </h2>
                    <div className="row align-items-center mt-4">
                        <div className="col-md-6">
                            <div className="">
                                <img src={imagen_ap} className="img-fluid rounded" alt="Imagen de la aplicación" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>
                                ¡Vive la experiencia de viaje definitiva!
                            </h3>
                            <p>
                                Descarga la aplicación de LuxeStays para acceder a toda la información de como encontrar
                                tu nuevo destino turístico.
                                Mantente al tanto de las últimas noticias, promociones y más, todo desde la comodidad de
                                tu dispositivo.
                            </p>
                            <p>
                                ¡No esperes más! Descargala ya desde los siguientes sitios web
                            </p>
                            <div className="d-flex">
                                <a href="#descarga" className="btn btn-primary me-2">
                                    Descargar en App Store
                                </a>
                                <a href="#descarga" className="btn btn-success">
                                    Descargar en Google Play
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <footer className="bg-dark text-light py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <h5 className="text-warning mb-3">Contacto</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <strong>Teléfono:</strong> +51 123 456 789
                                </li>
                                <li>
                                    <strong>Email:</strong> contacto@luxestays.com
                                </li>
                                <li>
                                    <strong>Dirección:</strong> Av. Principal 123, Lima, Perú
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h5 className="text-warning mb-3">Enlaces Útiles</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#Inicio" className="text-light hover:text-warning transition duration-300">Inicio</a>
                                </li>
                                <li>
                                    <a href="#fyhs" className="text-light hover:text-warning transition duration-300">Para Negocios</a>
                                </li>
                                <li>
                                    <a href="#preguntas" className="text-light hover:text-warning transition duration-300">Preguntas Frecuentes</a>
                                </li>
                                <li>
                                    <a href="#descarga" className="text-light hover:text-warning transition duration-300">Descarga nuestra App</a>
                                </li>
                                <li>
                                    <Link to="/login" className="text-light hover:text-warning transition duration-300">Iniciar Sesión</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h5 className="text-warning mb-3">Mensaje</h5>
                            <p>
                                ¡Gracias por elegir LUXESTAYS! Nos esforzamos por brindarte la mejor experiencia de hospedaje. Si tienes alguna consulta, no dudes en contactarnos.
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm text-light opacity-70">
                            © 2024 LUXESTAYS. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>

            <a href="https://wa.me/51972199525" target="_blank" className="position-fixed" style={{ 'bottom': '20px', 'right': '20px' }}>
                <img src={imagen_wsp} alt="WhatsApp" width="60px" />
            </a>
        </div>
    );
}

export default LandingPage;
