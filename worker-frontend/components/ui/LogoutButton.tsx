"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/hooks/useAuth";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to the home page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <button onClick={handleLogout} className="px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
      Log Out
    </button>
  );
};

export default LogoutButton;