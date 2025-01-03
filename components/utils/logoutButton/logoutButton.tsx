"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Usunięcie tokenu z cookies
    Cookies.remove("jwtToken");
    // Przekierowanie użytkownika na stronę logowania
    router.push("/login");
  };

  // Dodanie obsługi zdarzenia beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Usunięcie tokenu przed zamknięciem strony
      Cookies.remove("jwtToken");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Sprzątanie po odmontowaniu komponentu
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <button onClick={handleLogout}>
      <p>LOG OUT</p>
    </button>
  );
};

export default LogoutButton;
