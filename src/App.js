import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import PokemonList from "./components/PokemonListe";
import PokemonDetail from "./components/PokemonDetail";
import Navbar from "./components/NavBar";
import { usePokemonData } from "./hooks/userPokemonData";
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const { currentPage, filteredPokemon, handleSearch, handlePageChange } =
    usePokemonData();

  return (
    <LanguageProvider>
      <Router>
        <div className="">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search onSearch={handleSearch} />
                  <PokemonList
                    pokemonList={filteredPokemon}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </>
              }
            />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
