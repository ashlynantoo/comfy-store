import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <div className="mt-16 flex justify-center md:justify-end">
      <div className="join">
        <button
          className="join-item btn btn-sm sm:btn-md"
          onClick={() => {
            const prevPage = page - 1;
            if (prevPage > 0) {
              handlePageChange(prevPage);
            }
          }}
        >
          prev
        </button>
        {pages.map((pageNum, index) => {
          return (
            <button
              key={index}
              className={`join-item btn btn-sm sm:btn-md ${
                pageNum === page && "btn-active"
              }`}
              onClick={() => {
                handlePageChange(pageNum);
              }}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          className="join-item btn btn-sm sm:btn-md"
          onClick={() => {
            const nextPage = page + 1;
            if (nextPage <= pageCount) {
              handlePageChange(nextPage);
            }
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
