import type { NextApiRequest, NextApiResponse } from "next";

const API_ROUTE = process.env.GET_LAP_CORRELATION_MATRIX_URL;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!API_ROUTE) {
    throw new Error("GET_LAP_CORRELATION_MATRIX_URL is not defined");
  }
  try {
    const result = await fetch(API_ROUTE);
    const graph = await result.json();
    res.status(200).json(graph);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" + err });
  }
}
