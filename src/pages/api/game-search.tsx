import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Menambahkan header CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Menangani preflight request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Ambil parameter dari query
  const { appids } = req.query;

  if (!appids) {
    return res
      .status(400)
      .json({ error: "Invalid or missing searchInput parameter" });
  }

  const API_URL = `https://store.steampowered.com/api/appdetails?appids=${appids}`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Steam API request failed with status: ${response.status}`
      );
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Steam API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
