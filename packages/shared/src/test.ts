import axios from "axios";
import { IBMSRelayStatusFlags } from "./protoTypes";
import { generateFakeTelemetryData } from "./functions";
const {
  Battery: { BMSRelayStatusFlags: iBMSRelayStatusFlags_ },
} = generateFakeTelemetryData();
async function sendData() {
  try {
    const iBMSRelayStatusFlags = IBMSRelayStatusFlags.create(
      iBMSRelayStatusFlags_,
    );
    const bytes = IBMSRelayStatusFlags.encode(iBMSRelayStatusFlags).finish();
    const { data } = await axios.post("http://localhost:8000/receive", bytes, {
      headers: { "Content-Type": "application/octet-stream" },
      responseType: "arraybuffer",
    });

    const decodedObject = IBMSRelayStatusFlags.decode(data);
    console.log(decodedObject);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

sendData();
