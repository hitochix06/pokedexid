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
          <Form className="my-4 search-container">
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
            {error && (
              <Alert variant="danger" className="mt-2">
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
      <style jsx>{`
        .search-container {
          position: relative;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #666;
          z-index: 2;
        }

        .modern-search-input {
          width: 100%;
          padding-left: 35px;
          border-radius: 25px;
          border: 2px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .modern-search-input:focus {
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
          border-color: #28a745;
          outline: none;
        }

        .modern-search-input::placeholder {
          color: #999;
          font-style: italic;
        }
      `}</style>
    </Container>
  );
}

export default Search;
