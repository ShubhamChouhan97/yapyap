import { useEffect, useState } from "react";

const useAuthCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", { credentials: "include" });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    // Run the check initially
    checkAuth();

    // Set an interval to check periodically (every 5 seconds)
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, []);

  return isLoggedIn;
};

export default useAuthCheck;
