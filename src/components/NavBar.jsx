import React from "react";
import { useLanguage } from "../context/LanguageContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.svg";
import Dropdown from "react-bootstrap/Dropdown";

function Navigation() {
  const { setSpecificLanguage, language } = useLanguage();

  // Définition des noms de langues avec leurs drapeaux
  const languageNames = {
    fr: { name: "Français", flag: "🇫🇷" },
    en: { name: "English", flag: "🇬🇧" },
    ja: { name: "日本語", flag: "🇯🇵" },
  };

  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img src={logo} alt="icon" style={{ width: "200px" }} />
        </Navbar.Brand>

        <Dropdown>
          <Dropdown.Toggle variant="outline-light" id="language-dropdown">
            {languageNames[language].flag} {languageNames[language].name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.entries(languageNames).map(([code, { name, flag }]) => (
              <Dropdown.Item
                key={code}
                onClick={() => setSpecificLanguage(code)}
                active={language === code}
              >
                {flag} {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default Navigation;
