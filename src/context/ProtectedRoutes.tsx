import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth()) {
      toast.error("Please login to access this page");
      navigate("/login");
    }
  }, [checkAuth, navigate]);

  return checkAuth() ? <>{children}</> : null;
};
