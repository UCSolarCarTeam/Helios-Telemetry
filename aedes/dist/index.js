"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const aedes_1 = __importDefault(require("aedes"));
const net_1 = require("net");
const port = 1883;
const aedes = new aedes_1.default();
const server = (0, net_1.createServer)(aedes.handle);
server.listen(port, function () {
  console.log("server started and listening on port ", port);
});
//# sourceMappingURL=index.js.map
