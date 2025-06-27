import { saveRecentSearch } from "./collection";

interface SearchResult {
  value: PublishedFileDetails | null;
  status: string;
}

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
}

export default async function handleSearch(
  searchInput: string
): Promise<SearchResult> {
  const API_URL = "/api/item-search";

  try {
    if (!searchInput) {
      throw new Error("Search input cannot be empty.");
    }

    const formData = new FormData();
    formData.append("itemcount", "1");
    formData.append("publishedfileids[0]", searchInput);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const publishedFileDetails: PublishedFileDetails | undefined =
      data.response?.publishedfiledetails?.[0];

    // Validasi jika detail file tidak ditemukan
    if (!publishedFileDetails || !publishedFileDetails.title) {
      return {
        value: null,
        status: "failed",
      };
    }

    saveRecentSearch({
      id: searchInput,
      title: publishedFileDetails.title,
    });

    return {
      value: publishedFileDetails,
      status: "success",
    };
  } catch (e) {
    console.error("Error during search:", e);

    return {
      value: null,
      status: "failed",
    };
  }
}
