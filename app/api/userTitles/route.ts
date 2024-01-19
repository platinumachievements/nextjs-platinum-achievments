import { getUserTitles } from "psn-api";

export async function GET(req: Request) {
  try {
    // Extract the access token and targetAccountId from the request headers or body
    const token = req.headers.get("accessToken");
    const targetAccountId = req.headers.get("targetAccountId");
    const username = req.headers.get("username");
    const tokenType = req.headers.get("TokenType");
    console.log("Access Token:", accessToken);
    console.log("User Id:", targetAccountId);
    console.log("Username:", username);
    console.log("Token Type:", tokenType);

    if (!token) {
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

    console.log("Performing Title Search...");

    let offset = 0;
    const limit = 800;
    let allTitles = [];
    let callCount = 0;

    while (true) {
      callCount++;
      const response = await getUserTitles({ token }, targetAccountId, {
        limit,
        offset,
      });

      if (!response || !response.trophyTitles) {
        console.error("Invalid response from getUserTitles:", response);
        break;
      }

      allTitles.push(...response.trophyTitles);

      if (response.trophyTitles.length < limit) {
        break;
      }

      offset += limit;
    }

    const games = allTitles.map((title) => ({
      npServiceName: title.npServiceName,
      npCommunicationId: title.npCommunicationId,
      trophySetVersion: title.trophySetVersion,
      trophyTitleName: title.trophyTitleName,
      trophyTitleIconUrl: title.trophyTitleIconUrl,
      trophyTitlePlatform: title.trophyTitlePlatform,
      hasTrophyGroups: title.hasTrophyGroups,
      definedTrophies: title.definedTrophies,
      progress: title.progress,
      earnedTrophies: title.earnedTrophies,
      hiddenFlag: title.hiddenFlag,
      lastUpdatedDateTime: title.lastUpdatedDateTime,
      trophyTitleDetail: title.trophyTitleDetail,
    }));

    return new Response(JSON.stringify({ games }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching titles:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
