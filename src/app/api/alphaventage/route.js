import { NextResponse } from "next/server";
const url =
  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.alpha_vintage_key}`;

const getInfo = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
};

export async function GET(req) {
  const title = await getInfo();
  return NextResponse.json({ message: `${title}` });
}
