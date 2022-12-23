import Link from "next/link";

const Pagination = ({ currentPage, total, limit }) => {
  const lastPage = Math.ceil(total / limit);
  return (
    <>
      {currentPage > 1 && (
        <Link
          href={`/events?page=${currentPage - 1}`}
          className='btn-secondary'
        >
          Prev
        </Link>
      )}
      {currentPage < lastPage && (
        <Link
          href={`/events?page=${currentPage + 1}`}
          className='btn-secondary'
        >
          Next
        </Link>
      )}
    </>
  );
};

export default Pagination;
