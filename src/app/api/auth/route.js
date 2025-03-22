export  async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { request_token } = req.body;

  try {
    const response = await fetch("https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByRequestToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.NEXT_PUBLIC_PUBLISHER_KEY,
        request_token: request_token,
      }),
    });

    const data = await response.json();

    if (data.status) {
      return res.status(200).json({ access_token: data.data.jwtToken });
    } else {
      return res.status(400).json({ message: "Login Failed", error: data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
