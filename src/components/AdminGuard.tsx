import { Navigate } from "react-router-dom";
// Update the import path if useUser exists elsewhere, for example:
import { useUser } from "../hooks/useUser.tsx";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const adminEmails = import.meta.env.VITE_GALLERY_ADMIN_EMAILS?.split(",");
  const isAdmin = user?.role === "admin" || (user?.email && adminEmails?.includes(user.email));
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
