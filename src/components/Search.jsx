import React, { useState, useEffect } from "react";
import { Form, FormControl, Container, Row, Col, Alert } from "react-bootstrap";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      setSearchTerm(value);
      setError("");
    } else {
      setError("Veuillez n'entrer que des lettres.");
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form className="d-flex flex-column align-items-center my-3">
            <FormControl
              type="search"
              placeholder="Rechercher un Pokémon"
              className="py-1 form-control-sm mb-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleChange}
            />
            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
