const envSocketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
const envProdURL = process.env.NEXT_PUBLIC_PROD_URL;

export const socketURL =
  envSocketURL && envSocketURL.trim() !== ""
    ? envSocketURL
    : "http://localhost:3001";

export const prodURL =
  envProdURL && envProdURL.trim() !== ""
    ? envProdURL
    : "http://localhost:3001";
