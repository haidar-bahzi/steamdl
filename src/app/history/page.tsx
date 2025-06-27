"use client";

import { useState, useEffect } from "react";
import { getUserHistory } from "@/controller/collection";
import { FaGamepad, FaUpload } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface HistoryItem {
  id: string;
  title: string;
  image: string;
  game: string;
  create: number;
}

export default function Page() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const userHistory = getUserHistory();

    if (userHistory) {
      setHistory(userHistory);
    }
  }, []);

  const filteredHistory = history.filter(
    (item: HistoryItem) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 w-full container-child text-white">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between mb-6">
        <p className="text-xl lg:text-2xl font-bold">Your Search History</p>
        {history.length > 0 && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full lg:w-80 bg-[#1B2838] !outline-none text-sm rounded px-3 py-2"
            placeholder="Search History"
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {history.length > 0 ? (
          filteredHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
              {filteredHistory.map((item: HistoryItem) => (
                <Link
                  key={item.id}
                  href={`/browse/${item.id}`}
                  className="bg-[#1B2838] rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div>
                    <Image
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={`Thumbnail of ${item.title}`}
                      className="w-full h-32 object-cover"
                      width={150}
                      height={128}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-white font-semibold truncate">
                      {item.title}
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <i>
                          <FaGamepad />
                        </i>

                        {item.game}
                      </p>

                      <p className="text-gray-400 text-xs flex items-center gap-2">
                        <i>
                          <FaUpload />
                        </i>

                        {format(new Date(item.create * 1000), "dd MMM, yyyy")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center h-[20rem]">
              <p className="text-gray-400 text-center">
                No history match your search. <br />
                Try a different search term.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-1 justify-center items-center h-[20rem]">
            <p className="text-gray-400 text-center">
              Your search history is empty! <br />
              Discover amazing Workshop content—try searching now!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
