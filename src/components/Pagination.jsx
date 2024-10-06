import React from "react";

function Pagination({ currentPage, onPrevious, onNext }) {
  return (
    <div className="d-flex justify-content-center mt-3">
      <button className="btn btn-primary me-2" onClick={onPrevious}>
        Précédent
      </button>
      <span className="mx-3 align-self-center">Page {currentPage}</span>
      <button className="btn btn-primary ms-2" onClick={onNext}>
        Suivant
      </button>
    </div>
  );
}

export default Pagination;
