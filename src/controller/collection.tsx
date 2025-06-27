const USER_COLLECTION_KEY = "user_collection";
const HISTORY_SEARCHES_KEY = "history_searches";
const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 3;

export const saveRecentSearch = (searchQuery: {
  id: string;
  title: string;
}) => {
  try {
    const existingSearches = JSON.parse(
      localStorage.getItem(RECENT_SEARCHES_KEY) || "[]"
    );

    const uniqueSearches = existingSearches.filter(
      (search: { id: string }) => search.id !== searchQuery.id
    );

    const updatedSearches = [searchQuery, ...uniqueSearches];

    const limitedSearches = updatedSearches.slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("Failed to save recent searches:", error);
  }
};

export function saveUserCollection(data: {
  id: string;
  title: string;
  image: string;
  game: string;
  create: number;
}) {
  const userCollection = JSON.parse(
    localStorage.getItem(USER_COLLECTION_KEY) || "[]"
  );

  const filteredCollection = userCollection.filter(
    (item: { id: string }) => item.id !== data.id
  );

  const updatedCollection = [data, ...filteredCollection];

  try {
    localStorage.setItem(
      USER_COLLECTION_KEY,
      JSON.stringify(updatedCollection)
    );
    return { status: "Success" };
  } catch (error) {
    console.error(error);
    return { status: "Error" };
  }
}

export function deleteUserCollectionById(id: string) {
  const userCollection = JSON.parse(
    localStorage.getItem(USER_COLLECTION_KEY) || "[]"
  );

  const updatedCollection = userCollection.filter(
    (item: { id: string }) => item.id !== id
  );

  try {
    localStorage.setItem(
      USER_COLLECTION_KEY,
      JSON.stringify(updatedCollection)
    );
    return { status: "Success" };
  } catch (error) {
    console.error(error);
    return { status: "Error" };
  }
}

export function getUserCollectionbyId(id: string) {
  const userCollection = JSON.parse(
    localStorage.getItem(USER_COLLECTION_KEY) || "[]"
  );

  const foundItem = userCollection.find(
    (item: { id: string }) => item.id === id
  );

  return foundItem ? 1 : 0;
}

export function getUserCollection() {
  const userCollection = JSON.parse(
    localStorage.getItem(USER_COLLECTION_KEY) || "[]"
  );

  return userCollection;
}

export function getUserHistory() {
  const userCollection = JSON.parse(
    localStorage.getItem(HISTORY_SEARCHES_KEY) || "[]"
  );

  return userCollection;
}

export const saveHistorySearch = (historySearch: {
  id: string;
  title: string;
  image: string;
  game: string;
  create: number;
}) => {
  try {
    const existingHistory = JSON.parse(
      localStorage.getItem(HISTORY_SEARCHES_KEY) || "[]"
    );

    const uniqueHistory = existingHistory.filter(
      (search: { id: string }) => search.id !== historySearch.id
    );

    const updatedSearches = [historySearch, ...uniqueHistory];

    const limitedSearches = updatedSearches.slice(0);

    localStorage.setItem(HISTORY_SEARCHES_KEY, JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("Failed to save history searches:", error);
  }
};
