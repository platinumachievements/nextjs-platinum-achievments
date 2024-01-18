import { useState } from "react";

export function Authenticate({ setParentData }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          npsso:
            "EvTyvFx2HorEeuosmHUOnCfowfv82HdjKVpIu1SgktNV0k1kpRKPnwCmBJXLNkEB",
        },
      });
      const jsonData = await response.json();
      setParentData(jsonData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Call API"}
    </button>
  );
}
