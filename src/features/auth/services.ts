import { SignJWT } from "jose";
import { SECRET_KEY } from "./constants";

// Save the token to localStorage
export const saveTokenToLocalStorage = (token: any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error saving token to localStorage", error);
    }
  } else {
    console.warn("localStorage is not available");
  }
};

// Generate a token based on the provided email
export const generateToken = async (email: string): Promise<string> => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);
  return token;
};
