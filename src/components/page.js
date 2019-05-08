import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ count, page, pageSize, onChange }) => {
  let remain = count % pageSize;
  let pageCount =
    remain > 0 ? (count - remain) / pageSize + 1 : count / pageSize;
  let pages =
    pageCount > 5
      ? [...Array(5).keys()]
      : [...Array(pageCount > 0 ? pageCount : 1).keys()];

  // 限制分頁條只顯示5頁。
  if (pageCount > 5 && page > 2) {
    if (page + 3 > pageCount) {
      pages = pages.map(v => v + (pageCount - 5));
    } else {
      pages = pages.map(v => v + (page - 2));
    }
  }

  return (
    <div
      className="dataTables_paginate paging_simple_numbers"
      id="dataTable_paginate"
    >
      <ul className="pagination">
        <li
          className={
            page > 0
              ? "paginate_button page-item previous "
              : "paginate_button page-item previous disabled "
          }
          id="dataTable_first"
        >
          <button
            aria-controls="dataTable"
            data-dt-idx="0"
            tabIndex="0"
            className="page-link"
            onClick={() => onChange(0)}
          >
            <i className="fas fa-angle-double-left" />
          </button>
        </li>
        <li
          className={
            page > 0
              ? "paginate_button page-item "
              : "paginate_button page-item disabled "
          }
          id="dataTable_previous"
        >
          <button
            aria-controls="dataTable"
            data-dt-idx="0"
            tabIndex="0"
            className="page-link"
            onClick={() => onChange(page - 1)}
          >
            <i className="fas fa-angle-left" />
          </button>
        </li>
        {pages.map((item, idx) => (
          <li
            key={"page-" + idx}
            className={
              item === page
                ? "paginate_button page-item active "
                : "paginate_button page-item "
            }
          >
            <button
              aria-controls="dataTable"
              data-dt-idx={item}
              tabIndex="0"
              className="page-link"
              onClick={() => onChange(item)}
            >
              {item + 1}
            </button>
          </li>
        ))}
        <li
          className={
            page < pageCount - 1
              ? "paginate_button page-item "
              : "paginate_button page-item disabled "
          }
          id="dataTable_next"
        >
          <button
            aria-controls="dataTable"
            data-dt-idx="0"
            tabIndex="0"
            className="page-link"
            onClick={() => onChange(page + 1)}
          >
            <i className="fas fa-angle-right" />
          </button>
        </li>
        <li
          className={
            page < pageCount - 1
              ? "paginate_button page-item next "
              : "paginate_button page-item next disabled "
          }
          id="dataTable_last"
        >
          <button
            aria-controls="dataTable"
            data-dt-idx="0"
            tabIndex="0"
            className="page-link"
            onClick={() => onChange(pageCount - 1)}
          >
            <i className="fas fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func
};

export default Pagination;
