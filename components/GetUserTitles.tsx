import { useState } from "react";
import { GetUserTitlesProps } from "@/app/types";

export function GetUserTitles({
  setParentData,
  authData,
  userData,
}: GetUserTitlesProps) {
  const [username, setUsername] = useState("");
  const [titleLoading, setTitleLoading] = useState(false);

  const handleClick = async () => {
    setTitleLoading(true);
    try {
      const response = await fetch("/api/usertitles", {
        method: "GET",
        headers: {
          Token: authData.accessToken,
          tokenType: authData.tokenType,
          targetAccountId: userData.accountId,
        },
      });

      // Parse the JSON response
      const jsonData = await response.json();

      // Set the parent data
      setParentData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTitleLoading(false);
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
        disabled={titleLoading}
        style={{
          backgroundColor: titleLoading ? "#ccc" : "#007BFF",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {titleLoading ? "Loading..." : "Get Games"}
      </button>
    </>
  );
}
