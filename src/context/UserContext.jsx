"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { apiFetch, wsUrl } from "@/lib/api";
const UserContext = createContext();

async function fetchCsrfToken() {
  const res = await apiFetch("/api/csrf_token/", {
    method: "GET",
  });
  const data = await res.json();
  return data.csrfToken;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userNickname, setuserNickname] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); //will regenerate the csrf token(get request again upon refresh| refresh(reset)=> re-generate new token)
  const [profileData, setProfileData] = useState(null); //Unless, login it will be called whenever user load the profile page(useEffect in profile page source). so Profile Data will be erased when user hit refresh. BUT will be updated(get request to back) and get a fresh data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communityProfile, setCommunityProfile] = useState();
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

        setCsrfToken(token);
      } catch (error) {
        console.error("CSRF token fetch error:", error);
      }
    };
    getToken();
  }, [fetchCsrfToken]);

  const loginUser = async (userpassword, useremail) => {
    try {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      const response = await apiFetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token,
        },
        body: JSON.stringify({
          userpassword: userpassword,
          useremail: useremail,
        }),
      });
      if (response.status === 200) {
        setUser(true);
        return { success: true };
      } else return { success: false };
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
      const response = await apiFetch("/api/profile_info/", {
        method: "GET",

        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching profile info: ${response.statusText}`);
      }

      const data = await response.json();
      setProfileData(data["data"]);
      setuserNickname(data["nickname"]);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      const response = await apiFetch("/api/community_profile/", {
        method: "GET",
        credentials: "include", // sends cookies for session
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching profile info: ${response.statusText}`);
      }

      const data = await response.json();
      setCommunityProfile({
        avatar: data["avatar"],
        nickname: data["nickname"],
        address: data["address"],
        likes: data["likes"],
        liked_users_avatar: data["liked_users_avatars"],
        liked_users_nickname: data["liked_users_nickname"],
      });
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
        userNickname,
        csrfToken,
        setUser,
        loginUser,
        fetchProfileData,
        fetchCsrfToken,
        profileData,
        fetchCommunityInfo,
        communityProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
