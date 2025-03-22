export async function POST(req, res) {
  const { request_token } = req.body;

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

    if (!authData.status) {
      return res.status(400).json({ message: "Login Failed", error: authData });
    }

    const access_token = authData.data.jwtToken;
    const profileResponse = await fetch("https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const profileData = await profileResponse.json();

    if (profileData.status) {
      return res.status(200).json({ profile: profileData.data });
    } else {
      return res.status(400).json({ message: "Failed to fetch profile", error: profileData });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}