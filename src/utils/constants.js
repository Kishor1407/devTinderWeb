// export const BASE_URL =
//   location.hostname === "localhost" ? "https://localhost:8000" : "/api";


// export const BASE_URL = "http://localhost:8000";


export const BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "/api";
