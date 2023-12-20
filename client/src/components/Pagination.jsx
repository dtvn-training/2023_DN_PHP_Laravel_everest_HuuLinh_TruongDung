import ReactPaginate from "react-paginate";
import "../assets/scss/components/Pagination.scss";
import PropTypes from 'prop-types';

const Pagination = ({ totalPages, setPage, current_page }) => {
  const handlePageClick = (data) => {
    let selected = data.selected;
    setPage("current_page", selected + 1);
  };

  return (
    <div className="pagination-bar">
      <ReactPaginate
        previousLabel={<i className="fa-solid fa-angle-left"></i>}
        nextLabel={<i className="fa-solid fa-angle-right"></i>}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={current_page - 1}
      />
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  current_page: PropTypes.number.isRequired,
}

export default Pagination;
