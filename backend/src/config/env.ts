const must = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
};

const optional = (name: string): string | undefined => {
  const value = process.env[name]?.trim();

  return value ? value : undefined;
};

const optionalNumber = (name: string): number | undefined => {
  const value = optional(name);

  if (!value) {
    return undefined;
  }

  return Number(value);
};

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  SERVER: {
    PORT: Number(must("SERVER_PORT")),
  },
  PG: {
    HOST: must("PG_HOST"),
    PORT: Number(must("PG_PORT")),
    USER: must("PG_USER"),
    PASSWORD: must("PG_PASSWORD"),
    DB: must("PG_DB"),
    ADMIN_NAME: must("ADMIN_NAME"),
    ADMIN_EMAIL: must("ADMIN_EMAIL"),
    ADMIN_PASS: must("ADMIN_PASS"),
  },
  JWT: {
    SECRET: must("JWT_SECRET"),
  },
  FRONTEND_URL: optional("FRONTEND_URL") ?? "http://localhost:4174",
  MAIL: {
    FROM: optional("MAIL_FROM") ?? "Vites & Gourmand <no-reply@vites-gourmand.local>",
    HOST: optional("SMTP_HOST"),
    PORT: optionalNumber("SMTP_PORT"),
    USER: optional("SMTP_USER"),
    PASS: optional("SMTP_PASS"),
    SECURE: optional("SMTP_SECURE") === "true",
  },

  MONGO_URI_ADMIN: must("MONGO_URI_ADMIN"),
};
