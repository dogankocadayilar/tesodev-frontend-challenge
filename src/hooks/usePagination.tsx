import { useState } from "react";

const usePagination = (initialPage = 1, itemsPerPage = 7) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const setItemsPerPage = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
  };
};

export default usePagination;
