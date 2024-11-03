import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtVerify } from "jose";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { SECRET_KEY } from "../features/auth/constants";
const PrivateRoutes = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = localStorage.getItem("authToken");
  const [isTokenValidState, setIsTokenValidState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isTokenValid = async (token: string | null): Promise<boolean> => {
    if (!token) return false;
    try {
      const secretKey = new TextEncoder().encode(SECRET_KEY);
      await jwtVerify(token, secretKey);
      return true;
    } catch (error) {
      console.error("Token verification failed", error);
      return false;
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const validToken = await isTokenValid(token);
      setIsTokenValidState(validToken);
      setLoading(false);
    };

    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsTokenValidState(true);
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && !(isTokenValidState || isAuthenticated)) {
      navigate("/login");
    }
  }, [loading, isTokenValidState, isAuthenticated, navigate]);

  // Display a loading screen or spinner while token validation is in progress
  if (loading) {
    return <div>Loading...</div>;
  }

  return isTokenValidState || isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
