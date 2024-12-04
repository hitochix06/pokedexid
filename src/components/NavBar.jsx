import React from "react";
import { useLanguage } from "../context/LanguageContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.svg";

function Navigation() {
  const { toggleLanguage, language } = useLanguage();

  const languageNames = {
    fr: "Français",
    en: "English",
  };

  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img src={logo} alt="icon" style={{ width: "200px" }} />
        </Navbar.Brand>

        <button className="language-toggle" onClick={toggleLanguage}>
          {languageNames[language]}
        </button>
      </Container>

      <style jsx>{`
        .language-toggle {
          padding: 8px 16px;
          background-color: transparent;
          border: 2px solid #ffffff;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .language-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        @media (max-width: 480px) {
          .language-toggle {
            padding: 6px 12px;
            font-size: 0.9em;
          }
        }
      `}</style>
    </Navbar>
  );
}

export default Navigation;
