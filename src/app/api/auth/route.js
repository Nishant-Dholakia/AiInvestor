import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { request_token } = await req.json();
    console.log("Received Request Token:", request_token);

    // Log the request body for debugging
    const requestBody = JSON.stringify({ request_token });
    console.log("Request Body:", requestBody);

    // Send request to Angel Broking API for authentication
    const authResponse = await fetch(
      "https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByRequestToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_PUBLISHER_KEY
        },
        body: requestBody,
      }
    );

    // Log raw response before parsing
    const authText = await authResponse.text();
    console.log("Auth API Raw Response:", authText);

    // Check if the response is valid JSON
    let authData;
    try {
      authData = JSON.parse(authText);
    } catch (error) {
      console.error("Auth API did not return JSON:", authText);
      return NextResponse.json(
        { message: "Invalid API response", error: authText },
        { status: 500 }
      );
    }

    // If API response is not successful
    if (!authResponse.ok || !authData.status) {
      console.error("Auth API Error:", authData);
      return NextResponse.json(
        { message: "Login Failed", error: authData },
        { status: 400 }
      );
    }

    const access_token = authData.data.jwtToken;
    console.log("Access Token:", access_token);

    // Fetch user profile with access token
    const profileResponse = await fetch(
      "https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Log raw profile response before parsing
    const profileText = await profileResponse.text();
    console.log("Profile API Raw Response:", profileText);

    // Check if the response is valid JSON
    let profileData;
    try {
      profileData = JSON.parse(profileText);
    } catch (error) {
      console.error("Profile API did not return JSON:", profileText);
      return NextResponse.json(
        { message: "Invalid Profile API response", error: profileText },
        { status: 500 }
      );
    }

    // If profile API response is unsuccessful
    if (!profileResponse.ok || !profileData.status) {
      console.error("Profile API Error:", profileData);
      return NextResponse.json(
        { message: "Failed to fetch profile", error: profileData },
        { status: 400 }
      );
    }

    return NextResponse.json({ profile: profileData.data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}