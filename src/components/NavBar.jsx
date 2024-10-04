import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function navigation() {
 return (
  <Navbar className='fond-red'>

   <Container>
    <Navbar.Brand href="#home">Pokedex<span className='red-text' >ID</span></Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
     <NavDropdown title="Langue" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Fr</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">
       Another action
      </NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">
       Separated link
      </NavDropdown.Item>
     </NavDropdown>
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}

export default navigation;

