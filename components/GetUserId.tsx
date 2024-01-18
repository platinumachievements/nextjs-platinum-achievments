import { useState } from "react";

export function GetUserId({ setParentData, data }) {
  const [username, setUsername] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  const handleClick = async () => {
    setUserLoading(true);
    try {
      const response = await fetch("/api/authenticateUser", {
        method: "GET",
        headers: {
          Token: data.accessToken,
          username: username,
        },
      });

      // Parse the JSON response
      const jsonData = await response.json();

      // Set the parent data
      setParentData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button
        onClick={handleClick}
        disabled={userLoading}
        style={{
          backgroundColor: userLoading ? "#ccc" : "#007BFF",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {userLoading ? "Loading..." : "Get User ID"}
      </button>
    </>
  );
}
