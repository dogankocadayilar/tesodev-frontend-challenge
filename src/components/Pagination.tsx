type PaginationProps = {
  currentPage: number;
  endIndex: number;
  pageSize: number;
  length: number;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
};

function Pagination({
  currentPage,
  endIndex,
  pageSize,
  length,
  nextPage,
  prevPage,
  goToPage,
}: PaginationProps) {
  const numOfPages = Math.ceil(length / pageSize);

  const paginationGoToPages: number[] = [];
  if (numOfPages <= 6) {
    for (let index = 1; index <= numOfPages; index++) {
      paginationGoToPages.push(index);
    }
  } else {
    for (let index = 1; index <= numOfPages; index++) {
      if (index <= 4 || index >= numOfPages - 2) {
        paginationGoToPages.push(index);
      }
    }
  }

  const buttonClassName =
    "cursor-pointer font-semibold px-3 py-1 rounded-md border-2 border-gray-500 text-gray-500 hover:border-[#4F75C2] focus:border-[#4F75C2] hover:text-[#4F75C2] focus:text-[#4F75C2] disabled:text-gray-400 disabled:border-gray-400 disabled:pointer-events-none transition-colors";

  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={buttonClassName}
        >
          Previous
        </button>
        {paginationGoToPages.map((idx) => {
          if (idx === 4)
            return (
              <span className="text-3xl font-bold tracking-widest">...</span>
            );
          return (
            <button
              onClick={() => goToPage(idx)}
              className={buttonClassName}
              style={
                idx === currentPage
                  ? { backgroundColor: "#4F75C2", color: "white" }
                  : {}
              }
            >
              {idx}
            </button>
          );
        })}
        <button
          onClick={nextPage}
          disabled={endIndex >= length}
          className={buttonClassName}
        >
          Next
        </button>
      </div>
      <span className="text-lg font-semibold">
        Page {currentPage} of {numOfPages}
      </span>
    </div>
  );
}

export default Pagination;
