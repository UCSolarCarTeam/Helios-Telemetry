import { IBMSRelayStatusFlags } from "./protoTypes";
const iBMSRelayStatusFlags = IBMSRelayStatusFlags.create();
const bytes = IBMSRelayStatusFlags.encode(iBMSRelayStatusFlags).finish();
// do something with the bytes...
const decodedPerson = IBMSRelayStatusFlags.decode(bytes);
console.log(JSON.stringify(decodedPerson));
