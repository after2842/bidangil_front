"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// We'll assume session-based auth + CSRF, so we do credentials: "include"
// and possibly X-CSRFToken if you have CSRF enabled.

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Optional: fetch CSRF token if needed
  // (If you already have a separate context that does this,
  //  you can unify them or skip it)

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8000/api/profile_info/", {
        method: "GET",
        credentials: "include", // sends cookies for session
      });

      if (!res.ok) {
        throw new Error(`Error fetching profile info: ${res.statusText}`);
      }

      const data = await res.json();
      setProfileData(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileData, // {profile, inprogress_orders, past_orders}
        loading,
        error,
        refetch: fetchProfileData, // optional: let components re-fetch
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
