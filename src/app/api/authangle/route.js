import { SmartConnect } from "smartapi-nodejs";

export async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { authToken } = req.body; 

  if (!authToken) {
    return res.status(400).json({ error: "Auth token is required" });
  }

  try {
    const api_key = process.env.PUBLISHER_KEY; 

    const obj = new SmartConnect({ api_key });
    obj.setAccessToken(authToken);

    const userProfile = await obj.getProfile();
    
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
}
