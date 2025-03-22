"use client"
export default function AngleLogin() {
  const API_KEY = process.env.NEXT_PUBLIC_PUBLISHER_KEY;
  const STATE = "onlystatejaytay";
  const LOGIN_URL = `https://smartapi.angelone.in/publisher-login?api_key=${API_KEY}&state=${STATE}`;

  return (
    <>
      <a
        href={LOGIN_URL}>
        Login with Angel One
      </a>
    </>

  );
}
