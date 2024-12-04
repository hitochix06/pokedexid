import React, { useState, useEffect } from "react";
import { Form, FormControl, Container, Row, Col, Alert } from "react-bootstrap";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (typeof onSearch === "function") {
        onSearch(searchTerm);
      }
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
          <Form className="search-container my-4">
            <div className="search-wrapper">
              <i className="fas fa-search search-icon"></i>
              <FormControl
                type="search"
                placeholder="Rechercher un Pokémon..."
                className="modern-search-input"
                aria-label="Search"
                value={searchTerm}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
