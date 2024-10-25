import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import logo from "../logo.svg";

function Navigation() {
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="icon" style={{ width: "200px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title="FR"
              id="basic-nav-dropdown"
              className="couleur-text custom-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">EN</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">CH</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style jsx>{`
        .custom-dropdown .dropdown-menu[data-bs-popper] {
          min-width: 80px;
          font-size: 0.9rem;
          padding: 0.25rem 0;
        }
        .custom-dropdown .dropdown-item {
          padding: 0.25rem 1rem;
        }
      `}</style>
    </Navbar>
  );
}

export default Navigation;
