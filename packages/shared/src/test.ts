import axios from "axios";
import { generateFakeTelemetryData } from "./functions";
import { B3 as B3Proto } from "./protoTypes";
const { B3 } = generateFakeTelemetryData();
async function sendData() {
  try {
    const payload = B3Proto.create(B3);
    const bytes = B3Proto.encode(payload).finish();
    const { data } = await axios.post("http://localhost:8000/receive", bytes, {
      headers: { "Content-Type": "application/octet-stream" },
      responseType: "arraybuffer",
    });

    const decodedObject = B3Proto.decode(data);
    console.log(decodedObject);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

sendData();
