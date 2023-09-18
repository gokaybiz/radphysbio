import { getHeader } from "h3";

export default defineEventHandler((event) => {
  const proxyToken = getHeader(event, "x-proxy-token");

  // Check if the token is missing or incorrect
  if (
    !proxyToken ||
    proxyToken !== "radbiodb-36435d36g8HB0f50B9A3346e50Hd529"
  ) {
    return sendRedirect(
      event,
      "http://radbiodb.physics.ntua.gr/radphysbio/",
      301
    );
  }
});
