"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    try {
      // Call the API route to log out
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (response.ok) {
        // Redirect to the login page after successful logout
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-40 h-12 flex items-center gap-4 px-6 py-3 bg-[#4F46E5] text-white rounded-lg shadow hover:bg-[#777E99]"
    >
      <span className="text-xl">Logout</span>
      <LogOut size={16} />
    </button>
  );
}
