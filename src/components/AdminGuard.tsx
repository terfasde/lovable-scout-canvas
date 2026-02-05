import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const adminEmails = import.meta.env.VITE_GALLERY_ADMIN_EMAILS?.split(",");
  if (!user || !adminEmails?.includes(user.email)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
