import type { NextApiRequest, NextApiResponse } from "next";

import { prodURL } from "@shared/helios-types";

const BACKEND_ROUTE = `${prodURL}/ml/correlation-matrix/lap`;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await fetch(BACKEND_ROUTE);

    if (!result.ok) {
      const errorData = await result.json().catch(() => ({}));
      return res.status(result.status).json({
        error: errorData.error || "Failed to fetch correlation matrix data",
      });
    }

    const graph = await result.json();
    res.status(200).json(graph);
  } catch (err) {
    res.status(500).json({
      error: `Failed to load data: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
}
