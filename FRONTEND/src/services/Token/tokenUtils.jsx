import { jwtDecode } from "jwt-decode";

export function isAccessTokenExpired(token, margin = 30) {
  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp - now < margin;
  } catch {
    return true;
  }
}
