// app/api/fetchUserData/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  // Extract the auth token from the Authorization header
  const authToken = request.headers.get("authorization")?.split(" ")[1];

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user data from Angel One's API
    const response = await fetch(
      "https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}