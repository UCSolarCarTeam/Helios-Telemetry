// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Aedes = require("aedes");
const { createServer } = require("net");

const aedes = new Aedes();
const server = createServer(aedes.handle);

export default server;