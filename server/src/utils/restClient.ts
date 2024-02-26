import axios from "axios";
import { Agent } from "https";

const httpsAgent = new Agent({});
export const HTAxiosInstance = axios.create({
  httpsAgent,
});
