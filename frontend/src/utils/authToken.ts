type JwtPayload = {
  exp?: number;
};

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  return atob(padded);
};

export const getTokenPayload = (token: string | null | undefined): JwtPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload)) as JwtPayload;
  } catch {
    return null;
  }
};

export const getTokenExpiryTime = (token: string | null | undefined) => {
  const payload = getTokenPayload(token);

  if (typeof payload?.exp !== "number") {
    return null;
  }

  return payload.exp * 1000;
};

export const getTokenRemainingMs = (token: string | null | undefined) => {
  const expiryTime = getTokenExpiryTime(token);

  if (expiryTime == null) {
    return 0;
  }

  return expiryTime - Date.now();
};

export const isTokenExpired = (token: string | null | undefined) => {
  if (!token) {
    return true;
  }

  return getTokenRemainingMs(token) <= 0;
};
