import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const GlobalNavbar = ({ links }) => {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="light" className="fixed-top">
        <Container>
          {/* Add Home link to Navbar.Brand */}
          <Navbar.Brand href="/">BOLT</Navbar.Brand>
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
    </div>
  );
};
export default GlobalNavbar;
