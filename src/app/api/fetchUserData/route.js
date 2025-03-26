
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const authToken = request.headers.get("authorization")?.split(" ")[1];

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  


  const profile = 'https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getProfile'
  
  var data = ''

  try {
    const config = {
      method: 'get',
      url: profile,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-PrivateKey': process.env.NEXT_PUBLIC_PUBLISHER_KEY,
        'X-SourceID': 'WEB',
        'X-MACAddress': '00:1A:2B:3C:4D:5E',
      },
      data : data
    };
    
    const response = await axios(config); 
    console.log(response.data);
    if (response.data && response.data.status) {
      
      return NextResponse.json(response.data, { status: 200 });
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