import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.password === process.env.MQTT_PASSWORD) {
      res.status(200).send("Authorized");
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
