import type { NextApiRequest, NextApiResponse } from "next";

const API_ROUTE = process.env.GET_PACKET_CORRELATION_MATRIX_URL;
if (!API_ROUTE) {
  throw new Error("GET_PACKET_CORRELATION_MATRIX_URL is not defined");
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await fetch(API_ROUTE as string);
    const graph = await result.json();
    res.status(200).json(graph);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" + err });
  }
}
