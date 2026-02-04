const must = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
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
  },

  MONGO_URI_ADMIN: must("MONGO_URI_ADMIN"),
};
