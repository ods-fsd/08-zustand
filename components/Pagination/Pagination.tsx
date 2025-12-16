import css from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;


  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; 

    if (totalPages <= maxVisiblePages + 2) {

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {

      pageNumbers.push(1);

      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);


      if (page <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      if (page >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }


      if (startPage > 2) {
        pageNumbers.push('...');
      }


      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }


      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }


      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((p, index) => (
        <button
          key={index}
          className={`${css.button} ${p === page ? css.active : ''} ${
            p === '...' ? css.dots : ''
          }`}
          onClick={() => (typeof p === 'number' ? onChange(p) : undefined)}
          disabled={p === '...'}
        >
          {p}
        </button>
      ))}

      <button
        className={css.button}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}