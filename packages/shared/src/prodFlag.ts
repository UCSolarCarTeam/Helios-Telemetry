export const socketURL =
  process.env.NODE_ENV === "production"
    ? "aedes.calgarysolarcar.ca:3001"
    : "http://localhost:3001";

export const prodURL =
  process.env.NODE_ENV === "production"
    ? "https://aedes.calgarysolarcar.ca:3001"
    : "http://localhost:3001";
