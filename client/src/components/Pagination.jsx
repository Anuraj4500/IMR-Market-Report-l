import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {

  // Function to handle scrolling to the top
  const handlePageChange = (newPage) => {
    onPageChange(newPage); // Call the onPageChange prop to update the page
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="web-pagination">
      <ul className="pagination">
        <li className="total_page_head">
          <a className="total_pages">Showing: {page} of {totalPages}</a>
        </li>

        <li>
          <a title="First Page" onClick={() => handlePageChange(1)}>
            <i className="fa fa-angle-double-left"></i>
          </a>
        </li>

        <li className={page === 1 ? 'disabled' : ''}>
          <a title="Previous Page" onClick={() => page > 1 && handlePageChange(page - 1)}>
            <i className="fa fa-angle-left"></i>
          </a>
        </li>

        <li>
          <a className="active" href="#current" onClick={() => handlePageChange(page)}>
            {page}
          </a>
        </li>

        <li className={page === totalPages ? 'disabled' : ''}>
          <a title="Next Page" onClick={() => page < totalPages && handlePageChange(page + 1)}>
            <i className="fa fa-angle-right"></i>
          </a>
        </li>

        <li>
          <a title="Last Page" onClick={() => handlePageChange(totalPages)}>
            <i className="fa fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
