import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Header CORS standar
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Ubah jika ingin membatasi origin
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Tangani preflight request
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Origin",
      corsHeaders["Access-Control-Allow-Origin"]
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      corsHeaders["Access-Control-Allow-Methods"]
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      corsHeaders["Access-Control-Allow-Headers"]
    );
    return res.status(204).end();
  }

  if (req.method === "POST") {
    try {
      // Parsing FormData menggunakan formidable
      const form = formidable();
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error("Formidable error:", err);
          return res.status(500).json({ error: "Failed to parse form data" });
        }

        // Konversi fields ke FormData untuk request ke Steam API
        const proxyFormData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          proxyFormData.append(key, value as unknown as string);
        });

        // Kirim request ke Steam API
        const steamApiResponse = await fetch(
          "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/",
          {
            method: "POST",
            body: proxyFormData,
          }
        );

        if (!steamApiResponse.ok) {
          throw new Error(
            `Steam API request failed with status: ${steamApiResponse.status}`
          );
        }

        const responseBody = await steamApiResponse.json();

        // Kirim respons ke klien
        res.setHeader(
          "Access-Control-Allow-Origin",
          corsHeaders["Access-Control-Allow-Origin"]
        );
        return res.status(200).json(responseBody);
      });
    } catch (err) {
      console.error("API error:", err);
      res.setHeader(
        "Access-Control-Allow-Origin",
        corsHeaders["Access-Control-Allow-Origin"]
      );
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader(
      "Access-Control-Allow-Origin",
      corsHeaders["Access-Control-Allow-Origin"]
    );
    return res.status(405).json({ error: "Method not allowed" });
  }
}
