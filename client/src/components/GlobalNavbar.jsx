import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const GlobalNavbar = ({ links }) => {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="light" className="fixed-top">
        <Container>
          {/* Add Home link to Navbar.Brand */}
          <Navbar.Brand href="#home">BOLT</Navbar.Brand>
          <Nav className="me-auto">
            {links.map((link) => (
              <Nav.Link href={link.path} key={link.id}>
                {link.label}
              </Nav.Link>
            ))}
            {/* <Nav.Link href="www.linkedin.com/in/leo-bonjo" target="_blank">
              About Me
            </Nav.Link> Can't get it to remove LocalHost:4000 from the url... */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default GlobalNavbar;
