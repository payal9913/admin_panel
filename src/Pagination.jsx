// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <>
    
      <button className="btn-page" onClick={() => paginate(1)} disabled={currentPage === 1}>
        First
      </button>
      <button className="btn-page prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`btn-page ${currentPage === index + 1 ? 'active' : ''}`}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button className="btn-page next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <button className="btn-page" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </>
    
  );
};

export default Pagination;
