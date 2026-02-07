export const socketURL =
  process.env.NODE_ENV === "production"
    ? "aedes.calgarysolarcar.ca:3001"
    : "http://localhost:3001";

const envProdURL = process.env.NEXT_PUBLIC_PROD_URL;

export const prodURL =
  envProdURL && envProdURL.trim() !== ""
    ? envProdURL
    : process.env.NODE_ENV === "production"
      ? "https://aedes.calgarysolarcar.ca:3001"
      : "http://localhost:3001";
