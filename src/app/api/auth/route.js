import { NextResponse } from "next/server";

export async function POST(req) {
  const { request_token } = req.body;
  console.log("token is " , request_token);
  try {

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

    console.log("api data is : " , authData);

    if (!authData.status) {
      return res.status(400).json({ message: "Login Failed", error: authData });
    }

    const access_token = authData.data.jwtToken;
    console.log(access_token)

    const profileResponse = await fetch("https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("profile response is ", profileResponse);


    const profileData = await profileResponse.json();
    console.log("profile data is ", profileData);

    if (profileData.status) {
      console.log("profile data is ", profileData);
      return NextResponse.json({ profile: profileData.data });
    } else {
      return NextResponse.json({ message: "Failed to fetch profile", error: profileData });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error: error.message });
  }
}