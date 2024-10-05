import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "../logo.svg";

function navigation() {
  return (
    <Navbar bg="danger" data-bs-theme="danger">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="icon" style={{ width: "150px" }} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          <NavDropdown
            title="Fr"
            id="basic-nav-dropdown"
            className="couleur-text"
          >
            <NavDropdown.Item href="#action/3.1"> EN</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">CH</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navigation;
