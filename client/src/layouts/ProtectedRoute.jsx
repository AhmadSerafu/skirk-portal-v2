import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  if (!localStorage.getItem("access_token")) {
    toast.error("You must login first!", { toastId: "auth-error" });
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
