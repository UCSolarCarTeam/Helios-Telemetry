import axios from "axios";
import { IBMSRelayStatusFlags } from "./protoTypes";

const iBMSRelayStatusFlags_: IBMSRelayStatusFlags = {
  AlwaysOnSignalStatus: false,
  ChargeRelayEnabled: true,
  ChargerSafetyEnabled: false,
  DischargeRelayEnabled: true,
  IsChargingSignalStatus: true,
  IsReadySignalStatus: true,
  MalfunctionIndicatorActive: true,
  MultiPurposeInputSignalStatus: true,
};

async function sendData() {
  try {
    const iBMSRelayStatusFlags = IBMSRelayStatusFlags.create(
      iBMSRelayStatusFlags_,
    );
    const bytes = IBMSRelayStatusFlags.encode(iBMSRelayStatusFlags).finish();
    const { data } = await axios.post("http://localhost:4000/receive", bytes, {
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
