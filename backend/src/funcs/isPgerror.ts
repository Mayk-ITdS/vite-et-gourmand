type pgErrorLike = {
  code?: string;
  detail?: string;
  constraint?: string;
};

const isPgError = (error: unknown): error is pgErrorLike => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string"
  );
};
export { isPgError };
