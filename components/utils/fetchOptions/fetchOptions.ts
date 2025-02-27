const defaultFetchOptions: RequestInit = {
  next: {
    tags: ["wordpress"],
    revalidate: 3600,
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export default defaultFetchOptions;
