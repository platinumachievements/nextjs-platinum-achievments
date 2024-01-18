"use client";
import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // Make a GET request to the API
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          npsso:
            "EvTyvFx2HorEeuosmHUOnCfowfv82HdjKVpIu1SgktNV0k1kpRKPnwCmBJXLNkEB",
        },
      });

      // Parse the JSON response
      const jsonData = await response.json();

      // Set the data state variable
      setData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSearch = async () => {
    setUserLoading(true);
    try {
      // Make a GET request to the API
      const response = await fetch(
        `/api/authenticateUser?username=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Parse the JSON response
      const jsonData = await response.json();

      // Log the data to the console
      console.log(jsonData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#003791" }}>
      <h1 style={{ textAlign: "center" }}>Platinum Achievements</h1>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          backgroundColor: "#003791", // PlayStation blue
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0064d2")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#003791")}
      >
        {loading ? "Loading..." : "Call API"}
      </button>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button
        onClick={handleUserSearch}
        disabled={userLoading || !data}
        style={{
          backgroundColor: "#003791", // PlayStation blue
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginLeft: "10px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0064d2")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#003791")}
      >
        {userLoading ? "Loading..." : "Search User"}
      </button>
      {data && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #003791",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h2>Authentication Details</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
