import React, { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form
            className="d-flex align-items-center my-3"
            onSubmit={handleSubmit}
          >
            <FormControl
              type="search"
              placeholder="Rechercher un Pokémon"
              className="me-2 py-1 form-control-sm"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit" size="sm">
              Rechercher
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
