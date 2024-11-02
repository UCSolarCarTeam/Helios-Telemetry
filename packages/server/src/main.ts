import type { IncomingMessage, Server, ServerResponse } from "http";

import { BackendController } from "@/controllers/BackendController/BackendController";

export default function main(
  httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
) {
  return new BackendController(httpsServer);
}
