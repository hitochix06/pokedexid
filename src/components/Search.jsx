import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import pokemon from '../assets/pokemon/1.png';


function Search() {
 return (
  <Form className="d-flex m-2">
   <FormControl
    type="search"
    placeholder="Rechercher un Pokémon"
    className="me-2"
    arial-label="Search"
   />
   <Button variant="outline-success">Rechercher</Button>
  </Form>
 );
}

export default Search;