import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMMIAPI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function POST(req) {
    const body = await req.json();  // Extract JSON body data
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

    The following is the portfolio performance for a person. Provide advice related to it in JSON format with an array of advice objects. Output JSON only, nothing else.
    `;
    let result = (await model.generateContent(prompt)).response.text();
    result = result.trim().split('\n').slice(1, -1).join('\n');
    return NextResponse.json(JSON.parse(result));
}
  