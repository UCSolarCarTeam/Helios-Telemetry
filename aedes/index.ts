// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Aedes = require("aedes");
const { createServer } = require("net");

const port = 1883;

const aedes = new Aedes();
const server = createServer(aedes.handle);

server.listen(port, function () {
  console.log("server started and listening on port ", port);
});
