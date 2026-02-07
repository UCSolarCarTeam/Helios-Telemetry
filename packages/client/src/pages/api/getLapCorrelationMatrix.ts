import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const API_ROUTE = process.env.GET_LAP_CORRELATION_MATRIX_URL;
if (!API_ROUTE) {
  throw new Error("GET_LAP_CORRELATION_MATRIX_URL is not defined");
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // TODO: check to see if this is parsing correctly (json vs string)
    const response = await axios.get<string>(API_ROUTE as string);
    const graph = response.data;
    res.status(200).json(graph);
  } catch (err) {
    res.status(500).json({ error: `failed to load data: ${String(err)}` });
  }
}
