import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";

function ProductPagination({ totalPages, currentPage, hasNext, hasPrev }) {
  const [, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (hasPrev && currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

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
              className="pagination__btn"
              aria-label="Go to previous page"
              onClick={handlePrevious}
            >
              ← Previous
            </Button>

            <Button
              variant="outline"
              disabled={!hasNext}
              className="pagination__btn"
              aria-label="Go to next page"
              onClick={handleNext}
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
