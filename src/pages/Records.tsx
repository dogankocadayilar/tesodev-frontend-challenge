import { useMemo, useRef } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import RecordList from "../components/RecordList";

import { getFilteredRecords } from "../lib/helpers";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import OrderSelect from "../components/OrderSelect";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

function Records() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("q") || "";
  const searchRef = useRef<HTMLInputElement>(null);
  const order = searchParams.get("order") || "nasc";

  localStorage.setItem("search", JSON.stringify({ q: q, order: order }));

  // Filtered records
  const fr = useMemo(() => getFilteredRecords(q, order), [q, order]);

  // Paginaton
  const { currentPage, pageSize, goToPage, nextPage, prevPage } = usePagination(
    1,
    7
  );
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = fr.slice(startIndex, endIndex);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset pagination current page
    goToPage(1);

    const search = searchRef.current?.value.trim() || "";
    if (search.length === 0) return;
    localStorage.setItem("search", JSON.stringify({ q: search, order: order }));
    navigate({
      pathname: "/records",
      search: `?${createSearchParams({ q: search, order: order })}`,
    });
  };

  return (
    <div className="px-2 md:px-3 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-center md:justify-between md:items-center md:gap-14 gap-3 py-5 md:py-12 xl:px-0">
        <Link to="/">
          <Logo className="w-[300px] md:w-[150px] mx-auto" />
        </Link>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 md:flex-row gap-3 md:items-center"
        >
          <div className="flex items-center border-2 border-gray-400 focus-within:border-[#204080] flex-1 rounded-lg bg-white overflow-hidden py-2">
            <MagnifyingGlassIcon className="w-6 aspect-square mx-2 text-gray-500" />
            <input
              type="text"
              defaultValue={q}
              ref={searchRef}
              className="outline-none h-full w-full min-w-[100px] placeholder:text-gray-500"
              placeholder="Search..."
              aria-description="Search results will appear below"
              role="searchbox"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <Link
          to="/records/new"
          className="bg-[#204080] hover:bg-[#4F75C2] text-center focus:bg-[#4F75C2] focus:outline-none text-white px-10 py-2 rounded-xl transition-colors active:bg-[#162b57] truncate"
        >
          Add New Record
        </Link>
      </header>

      <main className="flex flex-col-reverse md:flex-row gap-5 md:gap-14">
        <div className="flex-1 space-y-1 flex flex-col gap-8">
          <span className="text-sm text-gray-500">
            {fr.length} results found
          </span>
          {/* List of records */}
          <RecordList records={visibleData} />
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            endIndex={endIndex}
            pageSize={pageSize}
            length={fr.length}
            goToPage={goToPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>

        {/* Order */}
        <OrderSelect
          value={order}
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("order", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        />
      </main>
    </div>
  );
}

export default Records;
