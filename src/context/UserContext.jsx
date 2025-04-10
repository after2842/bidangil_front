"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const UserContext = createContext();

async function fetchCsrfToken() {
  const res = await fetch("http://localhost:8000/api/csrf_token/", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); //will get reset(erased) upon refresh. => 1. user logs in, 2.user is updated, 3.user will get erased upon login unless storing in local storage
  const [csrfToken, setCsrfToken] = useState(""); //will regenerate the csrf token(get request again upon refresh| refresh(reset)=> re-generate new token)
  const [profileData, setProfileData] = useState(null); //Unless, login it will be called whenever user load the profile page(useEffect in profile page source). so Profile Data will be erased when user hit refresh. BUT will be updated(get request to back) and get a fresh data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeCsrfToken = useCallback(async () => {
    const token = await fetchCsrfToken();
    setCsrfToken(token);
  }, []);

  useEffect(() => {
    initializeCsrfToken();
  }, [initializeCsrfToken]);

  // 2) On mount, fetch the CSRF token once
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchCsrfToken();
        console.log("token", token);
        setCsrfToken(token);
        console.log(`csrf:${csrfToken}`);
      } catch (error) {
        console.error("CSRF token fetch error:", error);
      }
    };
    getToken();
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (userpassword, useremail) => {
    try {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        credentials: "include", //The client's browser should handle cookies (csrf cookie & login cookie)
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          userpassword: userpassword,
          useremail: useremail,
        }),
      });

      if (!response.ok) {
        console.log("wrong!!!!");
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log("result", result);
      console.log("result.data", result.data);
      console.log("result.data.nickname", result.data.nickname);
      setUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      console.log("userinfo", user.nickname);
      return { success: true };
    } catch (err) {
      console.error("Login error", err);
      return { success: false, message: err.message };
    }
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      const response = await fetch("http://localhost:8000/api/profile_info/", {
        method: "GET",
        credentials: "include", // sends cookies for session
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching profile info: ${res.statusText}`);
      }

      const data = await response.json();
      setProfileData(data.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        csrfToken,
        setUser,
        loginUser,
        fetchProfileData,
        fetchCsrfToken,
        profileData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
