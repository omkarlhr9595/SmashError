import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuth: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuth,
  children,
}) => {
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
