import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background: linear-gradient(to right, #4f46e5, #7c3aed); /* Degradado */
  margin: 0.75rem 0; /* Margen superior e inferior */
  display: flex; /* Alineación de los elementos en fila */
  justify-content: space-between; /* Separar elementos */
  padding: 1.25rem 2.5rem; /* Espaciado interno */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra */
`;

const NavbarLink = styled(Link)`
  font-size: 1.5rem; /* Tamaño de texto */
  font-weight: bold; /* Texto en negrita */
  color: #ffffff; /* Color del texto */
  text-decoration: none; /* Quitar subrayado */
  transition: color 0.2s ease-in-out; /* Transición suave */

  &:hover {
    color: #c7d2fe; /* Color al pasar el mouse */
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarLink to="/">Luxe Stays</NavbarLink>
    </NavbarContainer>
  );
}

export default Navbar;
