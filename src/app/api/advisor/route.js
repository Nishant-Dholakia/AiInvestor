import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMMIAPI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function POST(req) {
    const rawBody = await req.text();
    console.log("Raw Request Body:", rawBody);

    // Convert form-urlencoded string to a JavaScript object
    const params = new URLSearchParams(rawBody);
    const body = Object.fromEntries(params.entries());  
    const { returnData, sharpe, drawdown, beta, exposure, winLoss,  riskReward, holdingPeriod, fomo, panic } = body;

    const prompt = `
    Portfolio Return: ${returnData}%
    Sharpe Ratio: ${sharpe}
    Maximum Drawdown: ${drawdown}%
    Beta: ${beta}
    Single Stock Exposure: ${exposure}%
    Win/Loss Ratio: ${winLoss}
    Risk-Reward Ratio: ${riskReward}
    Average Holding Period: ${holdingPeriod} days
    FOMO Trades: ${fomo}%
    Panic Selling: ${panic}%    

    The following is the portfolio performance for a person. Provide advice related to it in JSON format with an array of advice objects. Output JSON only, nothing else. don't write variables syntex in the ans just write the absolute value for each parameter.
    `;
    let result = (await model.generateContent(prompt)).response.text();
    result = result.trim().split('\n').slice(1, -1).join('\n');
    return NextResponse.json(JSON.parse(result));
}
  