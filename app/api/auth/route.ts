import { exchangeNpssoForCode, exchangeCodeForAccessToken } from "psn-api";

// Handler for POST request
export async function GET(req: Request) {
  try {
    // Extract the NPSSO token from the request body
    const npsso = req.headers.get("npsso");

    if (!npsso) {
      return new Response(
        JSON.stringify({ error: "NPSSO token is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Exchange NPSSO token for an access code
    const accessCode = await exchangeNpssoForCode(npsso);
    console.log("Access code:", accessCode);

    // Exchange access code for access and refresh tokens
    const authorization = await exchangeCodeForAccessToken(accessCode);
    console.log("Authorization:", authorization);
    // Send back the authorization response
    return new Response(JSON.stringify(authorization), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error authenticating with PSN:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
