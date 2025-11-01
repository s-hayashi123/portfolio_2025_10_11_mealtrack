"use client";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="ml-2">
      ログアウト
    </Button>
  );
}
