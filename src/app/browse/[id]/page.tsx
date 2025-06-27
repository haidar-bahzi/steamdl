"use client";

import ErrorSearchPage from "@/components/error";
import LoadingPage from "@/components/loading";
import {
  deleteUserCollectionById,
  getUserCollectionbyId,
  saveHistorySearch,
  saveUserCollection,
} from "@/controller/collection";
import handleSearch from "@/controller/search";
import handleGameSearch from "@/controller/search_game";
import { format } from "date-fns";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { FaDownload, FaShareNodes, FaBookmark } from "react-icons/fa6";

interface PublishedFileDetails {
  consumer_app_id: string;
  title: string;
  description: string;
  preview_url: string;
  file_url: string;
  file_size: number;
  lifetime_subscriptions: number;
  views: number;
  time_created: number;
  time_updated: number;
  tags?: [];
  filename?: string;
}

interface GameDetails {
  name: string;
  capsule_image?: string;
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const navigate = useRouter();

  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<PublishedFileDetails | null>(null);
  const [game, setGame] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [collected, setCollected] = useState<boolean>(false);

  const isValidId = (input: string): boolean => {
    return /^\d+$/.test(input);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      if (!params || !isValidId(params.id)) {
        console.log("ID is invalid.");
        navigate.push("/");
        return;
      }

      setLoading(true);

      try {
        const searchQuery = await handleSearch(params.id);
        if (searchQuery.status === "failed" || !searchQuery.value) {
          console.error("Search failed or no data found.");
          setError(true);
          return;
        }

        setSearch(searchQuery.value);

        const consumerAppId = searchQuery.value.consumer_app_id;
        if (!consumerAppId) {
          console.error("consumer_app_id is missing.");
          setError(true);
          return;
        }

        const searchGameDetail = await handleGameSearch(consumerAppId);
        if (searchGameDetail.status === "success") {
          setGame({
            name: searchGameDetail.value!.name,
            capsule_image: searchGameDetail.value!.capsule_image,
          });
        } else {
          console.error("Failed to fetch game details or invalid data");
          setError(true);
        }

        const searchItemCollection = getUserCollectionbyId(params!.id);

        if (searchItemCollection === 1) {
          setCollected(true);
        }
      } catch (error) {
        console.error("Error fetching search:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [params!.id]);

  useEffect(() => {
    if (search != null && game != null) {
      saveHistorySearch({
        id: params!.id,
        title: search.title,
        image: search.preview_url,
        game: game.name,
        create: search.time_created,
      });
    }
  }, [search, game]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorSearchPage />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 w-full h-full">
      <div className="flex-1">
        <div className="bg-[#1B2838] p-4 rounded">
          <img
            className="rounded h-64"
            src={search?.preview_url!}
            alt="Preview Image"
          />

          <br />

          <p className="text-xl lg:text-4xl font-bold text-white">
            {search?.title}
          </p>

          <br />

          <pre
            className="text-sm 2xl:text-base"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            {search?.description}
          </pre>

          <br />

          {Array.isArray(search?.tags) && search?.tags.length > 0 ? (
            <>
              <p className="text-xl font-bold text-white mb-4">Tags</p>

              <ul className="flex flex-wrap gap-2">
                {search?.tags.map((tagObj: { tag: string }, index: number) => (
                  <li className="badge badge-outline p-3.5" key={index}>
                    {tagObj.tag}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No tags available</p>
          )}
        </div>
      </div>

      <div className="flex-none flex flex-col gap-4">
        <div className="bg-[#1B2838] p-4 rounded flex flex-col gap-4">
          <button
            disabled={search?.file_url === "" ? true : false}
            className="btn btn-wide w-full text-white btn-success"
            onClick={() => {
              const link = document.createElement("a");
              link.href = search?.file_url!;
              link.download = search?.filename!;
              link.click();
            }}
          >
            <i>
              <FaDownload />
            </i>
            {search?.file_url === "" ? "Unavailable" : "Download"}
          </button>

          {!collected ? (
            <button
              className="btn btn-wide w-full text-white btn-warning"
              onClick={() => {
                const action = saveUserCollection({
                  id: params!.id!,
                  title: search?.title || "",
                  image: search?.preview_url || "",
                  game: game?.name || "",
                  create: search?.time_created!,
                });

                if (action.status !== "Success") {
                  alert("Failed to Save Item to your Collection");
                  return;
                }

                setCollected(true);
              }}
            >
              <i>
                <FaBookmark />
              </i>
              Add to Collection
            </button>
          ) : (
            <button
              className="btn btn-wide w-full btn-warning btn-outline"
              onClick={() => {
                const action = deleteUserCollectionById(params!.id);

                if (action.status !== "Success") {
                  alert("Failed to Delete Item from your Collection");
                  return;
                }

                setCollected(false);
              }}
            >
              <i>
                <FaBookmark />
              </i>
              Item in Collection
            </button>
          )}

          <button
            className="btn btn-wide w-full text-white btn-info"
            onClick={async () => {
              await navigator.clipboard.writeText(
                `https://steamcommunity.com/sharedfiles/filedetails/?id=${
                  params!.id
                }`
              );
              alert("Link successfully copied to the clipboard");
            }}
          >
            <i>
              <FaShareNodes />
            </i>
            Share
          </button>
        </div>

        <div className="bg-[#1B2838] p-4 rounded flex flex-col gap-4">
          <p className="text-xl font-semibold text-white">Statistics</p>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p>Downloads</p>
              <p className="text-white">{search?.lifetime_subscriptions}</p>
            </div>

            <div className="flex justify-between">
              <p>Views</p>
              <p className="text-white">{search?.views}</p>
            </div>

            <div className="flex justify-between">
              <p>File Size</p>
              <p className="text-white">
                {(search?.file_size! / (1024 * 1024)).toFixed(3)} MB
              </p>
            </div>

            <div className="flex justify-between">
              <p>Date Posted</p>
              <p className="text-white">
                {format(new Date(search!.time_created * 1000), "dd MMM, yyyy")}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Last Updated</p>
              <p className="text-white">
                {format(new Date(search!.time_updated * 1000), "dd MMM, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1B2838] p-4 rounded flex flex-col gap-4">
          <p className="text-xl font-semibold text-white">Game Compatibility</p>

          <a
            href={`https://store.steampowered.com/app/${
              search!.consumer_app_id
            }`}
            target="_blank"
          >
            <img
              src={game!.capsule_image}
              className="w-full"
              alt="Game Thumbnail"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
