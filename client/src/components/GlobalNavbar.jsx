import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaBoltLightning } from "react-icons/fa6";

const GlobalNavbar = ({ links }) => {
  return (
    <Navbar bg="light" data-bs-theme="light" className="fixed-top navbar-custom">
      <Container fluid>
        {/* Add Home link to Navbar.Brand */}
        <Navbar.Brand href="/">
          <FaBoltLightning className="logo" /> BOLT
        </Navbar.Brand>
        <Nav className="me-auto">
          {links.map((link) => (
            <Nav.Link
              href={link.path}
              key={link.id}
              target={link.target ? link.target : null}
            >
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default GlobalNavbar;
