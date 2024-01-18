import { useState } from "react";
import { AuthenticationProps } from "@/app/types";

export function Authenticate({ setParentData }: AuthenticationProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    if (!process.env.NEXT_PUBLIC_NPSSO) {
      console.error("NEXT_PUBLIC_NPSSO is not set");
      return;
    }
    try {
      setLoading(true);
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          headers: {
            npsso: process.env.NEXT_PUBLIC_NPSSO,
          },
        });
        const jsonData = await response.json();
        setParentData(jsonData);
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
