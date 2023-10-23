import { Link, createSearchParams } from "react-router-dom";
import Search from "./Search";
import { getFilteredRecords } from "../lib/helpers";
import { useMemo, useState } from "react";
import { Record } from "../types/types";
import ListItem from "./ListItem";
import Logo from "./Logo";

function Hero() {
  const [query, setQuery] = useState<string>("");

  // Filter records by query for each key
  const fr = useMemo(() => getFilteredRecords(query, "nasc", 3), [query]);

  return (
    <main className="flex flex-col items-center gap-2">
      <div className="w-[340px] flex flex-col gap-2">
        <Logo className="w-[300px]" />
        <h2 className="font-semibold text-right">Search app</h2>
      </div>
      <div className="w-full md:w-[800px] space-y-5">
        <div className="space-y-2">
          <h1 className="text-4xl text-center md:text-left font-bold">
            Find in records
          </h1>
          <Search
            query={query}
            setQuery={setQuery}
            isResultsShowing={fr.length > 0}
          />
        </div>
        {fr.length > 0 && (
          <ul className="border-2 border-gray-400 md:-ml-10 md:w-[calc(700px+2.5rem)] rounded-3xl px-10 pt-3">
            {fr.map((record: Record) => (
              <ListItem key={record.id} record={record} />
            ))}
            <Link
              to={{
                pathname: "/records",
                search: `?${createSearchParams({
                  q: query.trim(),
                  order: "nasc",
                })}`,
              }}
              className="font-bold flex justify-center py-3"
            >
              Show more...
            </Link>
          </ul>
        )}
      </div>
    </main>
  );
}

export default Hero;
