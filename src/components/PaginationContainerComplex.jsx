import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainerComplex = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNum, isActiveBtn }) => {
    return (
      <button
        key={pageNum}
        className={`join-item btn btn-sm sm:btn-md ${
          isActiveBtn && "btn-active"
        }`}
        onClick={() => {
          handlePageChange(pageNum);
        }}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(addPageButton({ pageNum: 1, isActiveBtn: page === 1 }));
    if (page > 2) {
      pageButtons.push(
        <button key="dots-1" className="join-item btn btn-sm sm:btn-md">
          ...
        </button>
      );
    }
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNum: page, isActiveBtn: true }));
    }
    if (page < pageCount - 1) {
      pageButtons.push(
        <button key="dots-2" className="join-item btn btn-sm sm:btn-md">
          ...
        </button>
      );
    }
    pageButtons.push(
      addPageButton({ pageNum: pageCount, isActiveBtn: page === pageCount })
    );

    return pageButtons;
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
        {renderPageButtons()}
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

export default PaginationContainerComplex;
