"use client";

import { FaSearch } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<
    { id: string; title: string }[]
  >([]);

  const RECENT_SEARCHES_KEY = "recent_searches";

  const getRecentSearches = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
    }
    return [];
  };

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const extractIdFromUrl = (url: string): string | null => {
      const regex = /id=(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const isValidUrl = (input: string): boolean => {
      try {
        new URL(input);
        return true;
      } catch {
        return false;
      }
    };

    const isValidId = (input: string): boolean => {
      return /^\d+$/.test(input);
    };

    if (isValidUrl(search)) {
      const extractedId = extractIdFromUrl(search)?.toString()!;
      router.push(`/browse/${extractedId}`);
    } else if (isValidId(search)) {
      router.push(`/browse/${search}`);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center container-child">
      <p className="text-xl lg:text-4xl font-semibold text-white">
        Discover Amazing Content
      </p>

      <form
        className="input w-5/6 lg:w-1/2 !outline-none flex justify-between items-center bg-[#1B2838]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full h-full text-sm lg:text-base"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          required
          placeholder="Enter the workshop ID or URL here"
        />

        <button className="!border-transparent h-full text-sm" type="submit">
          <i>
            <FaSearch />
          </i>
        </button>
      </form>

      <div className="flex flex-col lg:flex-row gap-2 items-center text-sm text-[#8F98A0]">
        {recentSearches.length > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <i>
                <FaClock />
              </i>
              <p>Recent Search:</p>
            </div>

            <ul className="flex flex-col lg:flex-row text-center gap-2.5">
              {recentSearches.map(
                (
                  search: {
                    title: string;
                    id: string;
                  },
                  index: number
                ) => (
                  <li key={index}>
                    <a href={`/browse/${search.id}`}>{search.title}</a>
                  </li>
                )
              )}
            </ul>
          </>
        ) : (
          <p>Your recent searches will appear here.</p>
        )}
      </div>
    </div>
  );
}
