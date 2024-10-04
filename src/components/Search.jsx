import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form className="d-flex m-2" onSubmit={handleSubmit}>
      <FormControl
        type="search"
        placeholder="Rechercher un Pokémon"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-light" type="submit">
        Rechercher
      </Button>
    </Form>
  );
}

export default Search;
