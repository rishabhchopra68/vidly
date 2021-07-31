import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemCount, pageSize, currPage, onPageChange }) => {
  // const  = props;
  const numberOfPages = itemCount / pageSize;

  // console.log(Math.ceil(numberOfPages));

  const pages = _.range(1, numberOfPages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={currPage === page ? "page-item active" : "page-item"}
            key={page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  // to validate the props sent
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
