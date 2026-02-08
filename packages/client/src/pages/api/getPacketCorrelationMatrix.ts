import type { NextApiRequest, NextApiResponse } from "next";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await backendApi.get(
      BACKEND_ROUTES.ml.packetCorrelationMatrix,
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: `Failed to load data: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
}
