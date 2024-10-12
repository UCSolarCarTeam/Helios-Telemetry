export const getCredentials = () => {
  const privateKey = process.env.PRIVATE_KEY;
  const certificate = process.env.CERTIFICATE;
  const ca = process.env.CHAIN;

  return {
    ca,
    cert: certificate,
    key: privateKey,
  };
};
