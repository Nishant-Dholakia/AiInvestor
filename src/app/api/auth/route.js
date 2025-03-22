import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { request_token } = await req.json(); // Fix request body parsing
    console.log("Token is:", request_token);

    const authResponse = await fetch("https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByRequestToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.NEXT_PUBLIC_PUBLISHER_KEY,
        request_token: request_token,
      }),
    });

    const authData = await authResponse.json();
    console.log("API data is:", authData);

    if (!authData.status) {
      return NextResponse.json({ message: "Login Failed", error: authData }, { status: 400 });
    }

    const access_token = authData.data.jwtToken;
    console.log("Access Token:", access_token);

    const profileResponse = await fetch("https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const profileData = await profileResponse.json(); // Fix missing JSON parsing
    console.log("Profile Data:", profileData);

    if (profileData.status) {
      return NextResponse.json({ profile: profileData.data });
    } else {
      return NextResponse.json({ message: "Failed to fetch profile", error: profileData }, { status: 400 });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
