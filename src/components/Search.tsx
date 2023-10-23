import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { createSearchParams, useNavigate } from "react-router-dom";
import Button from "./Button";

type SearchProps = {
  query: string;
  setQuery: (value: string) => void;
  isResultsShowing: boolean;
};

function Search({ query, setQuery }: SearchProps) {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = query.trim();
    if (search.length === 0) return;
    localStorage.setItem(
      "search",
      JSON.stringify({ q: search, order: "nasc" })
    );
    navigate({
      pathname: "/records",
      search: `?${createSearchParams({ q: search, order: "nasc" })}`,
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col flex-1 md:flex-row gap-3 md:items-center"
    >
      <div className="flex items-center border-2 border-gray-400 focus-within:border-[#204080] flex-1 rounded-lg bg-white overflow-hidden py-2">
        <MagnifyingGlassIcon className="w-6 aspect-square mx-2 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none h-full w-full min-w-[100px] placeholder:text-gray-500"
          placeholder="Search..."
          aria-description="Search results will appear below"
          role="searchbox"
        />
      </div>
      {path !== "/records" && <Button type="submit">Search</Button>}
    </form>
  );
}

export default Search;
