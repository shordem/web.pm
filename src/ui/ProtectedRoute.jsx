import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../constants/auth";
import { Storage } from "../utilities/storage";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const storage = new Storage();
  const tokenValue = storage.getItem(ACCESS_TOKEN_KEY);

  useEffect(function () {
    if (!tokenValue) return navigate("/login");
  });
  if (tokenValue) return children;
}

export default ProtectedRoute;
