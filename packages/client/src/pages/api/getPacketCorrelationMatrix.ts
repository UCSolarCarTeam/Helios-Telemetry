import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { prodURL } from "@shared/helios-types";

const BACKEND_ROUTE = `${prodURL}/ml/correlation-matrix/packet`;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // TODO: check to see if this is parsing correctly (json vs string)
    const response = await axios.get<string>(BACKEND_ROUTE);

    if (!response.status || response.status !== 200) {
      return res.status(response.status).json({
        error: "Failed to fetch correlation matrix data",
      });
    }

    const graph = response.data;
    res.status(200).json(graph);
  } catch (err) {
    res.status(500).json({
      error: `Failed to load data: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
}
