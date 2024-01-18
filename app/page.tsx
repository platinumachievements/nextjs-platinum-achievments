"use client";
import { useState } from "react";
import { Authenticate } from "../components/Authenticate";
import { GetUserId } from "../components/GetUserId";

export default function HomePage() {
  const [authData, setAuthData] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#003791" }}>
      <h1 style={{ textAlign: "center" }}>Platinum Achievements</h1>
      <Authenticate setParentData={setAuthData} />
      <GetUserId setParentData={setUserData} data={authData} />

      {authData && (
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
          <pre>{JSON.stringify(authData, null, 2)}</pre>
        </div>
      )}
      {userData && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #003791",
            borderRadius: "4px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h2>User Details</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
