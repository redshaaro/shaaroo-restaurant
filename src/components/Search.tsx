"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const debouncedSearch = debounce((trimmedQuery: string) => {
    if (trimmedQuery !== "") {
      router.push(`/search?product=${encodeURIComponent(trimmedQuery)}`);
    }
  }, 1000);

  useEffect(() => {
    const trimmedQuery = query.trim();

    debouncedSearch(trimmedQuery);
  }, [query, router, debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
      .replace(/^\su+/, "")
      .replace(/[^\w\s]/gi, "");
    setQuery(inputValue);
  };

  return (
    <input
      className="border-b-2 p-[10px] border-[#EF4444] border-solid mx-2 outline-none text-red-500 md:text-lg"
      value={query}
      onChange={handleInputChange}
      placeholder="Enter meal name...."
    />
  );
};

export default Search;
