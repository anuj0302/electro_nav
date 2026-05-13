import api from "./api";

// EMAIL
export const emailLogin = (data) =>
  api.post("/auth/login/email", data);

export const emailSignup = (data) =>
  api.post("/auth/signup/email", data);

// PHONE
export const phoneLogin = (data) =>
  api.post("/auth/login/phone", data);

export const phoneSignup = (data) =>
  api.post("/auth/signup/phone", data); 