import { useNavigate } from "react-router";
import Button from "../../ui/Button";

function ProductPagination({ totalPages, currentPage, hasNext, hasPrev }) {
  const navigate = useNavigate();

  function handlePrev() {
    if (currentPage !== 1) {
      navigate(`/products?page=${currentPage - 1}`);
    }
  }

  function handleNext() {
    if (currentPage !== totalPages) {
      navigate(`/products?page=${currentPage + 1}`);
    }
  }

  if (totalPages <= 1) return null;

  return (
    <section className="pagination__section">
      <div className="pagination__container">
        <div className="pagination__wrapper">
          <div className="pagination__info">
            <span className="page__current">{currentPage}</span>
            <span className="page__separator">of</span>
            <span className="page__total">{totalPages}</span>
          </div>

          <div className="pagination__controls">
            <Button
              variant="outline"
              disabled={!hasPrev}
              onClick={handlePrev}
              className="pagination__btn"
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              disabled={!hasNext}
              onClick={handleNext}
              className="pagination__btn"
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPagination;
