// export const BASE_URL ="http://localhost:3000/api/v1"
// export const BASE_URL2="https://devconnect-1-lpat.onrender.com/api/v1" 

// src/constants.js or wherever you define BASE_URL

const IS_PRODUCTION = import.meta.env.MODE === "production";

export const BASE_URL = IS_PRODUCTION
  ? "https://devconnect-1-lpat.onrender.com/api/v1"
  : "http://localhost:3000/api/v1";

export const SOCKET_URL = IS_PRODUCTION
  ? "https://devconnect-1-lpat.onrender.com"
  : "http://localhost:3000";

  console.log("Running in", process.env.NODE_ENV || "development");
