import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={() => onPageChange(currentPage+1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
