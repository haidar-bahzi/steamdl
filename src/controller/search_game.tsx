interface SearchResult {
  value: Record<string, any> | null;
  status: string;
}

export default async function handleGameSearch(
  searchInput: string
): Promise<SearchResult> {
  const API_URL = `/api/game-search?appids=${searchInput}`;

  try {
    const response = await fetch(API_URL, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    const gameDetail = data?.[searchInput]?.data;

    if (!gameDetail) {
      throw new Error("Game detail not found or invalid response structure.");
    }

    return {
      value: gameDetail,
      status: "success",
    };
  } catch (e) {
    console.error("Error in handleGameSearch:", e);

    return {
      value: null,
      status: "failed",
    };
  }
}
