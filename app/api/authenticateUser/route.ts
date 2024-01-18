import { access } from "fs";
import { makeUniversalSearch } from "psn-api";

export async function GET(req) {
  try {
    // Extract the access token and username from the request headers or body
    const accessToken = req.headers.get("Token");
    const username = req.headers.get("username");
    console.log("Access Token:", accessToken);
    console.log("Username:", username);

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Access token is required" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Perform the universal search to get the user's accountId
    console.log("Performing universal search...");
    const allAccountsSearchResults = await makeUniversalSearch(
      { accessToken }, // Ensure this matches the expected format in the PSN API
      username,
      "SocialAllAccounts"
    );
    console.log("All Accounts Search Results:", allAccountsSearchResults);
    // Extract the accountId
    const targetAccountId =
      allAccountsSearchResults.domainResponses[0].results[0].socialMetadata
        .accountId;

    // Send back the accountId
    return new Response(JSON.stringify({ accountId: targetAccountId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching accountId:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
