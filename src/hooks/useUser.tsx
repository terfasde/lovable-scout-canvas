import { useEffect, useState } from "react";
import { getAuthUser } from "@/lib/backend";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const auth = await getAuthUser();
      setUser(auth);
    })();
  }, []);
  return { user };
}
