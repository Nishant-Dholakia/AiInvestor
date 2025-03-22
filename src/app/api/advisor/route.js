import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMMIAPI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function GET(req) {
    const prompt = `
    Portfolio Return: 8%
    Sharpe Ratio: 0.8
    Maximum Drawdown: 30%
    Beta: 1.2
    Sector Diversification: 70% Tech
    Single Stock Exposure: 20%
    Win/Loss Ratio: 1.2
    Risk-Reward Ratio: 1.5
    Average Holding Period: 90 days
    FOMO Trades: 15%
    Panic Selling: 20%    

    the following the portfolio performace for a person, give advices related to it, give a json with advices array
    give me just json nothing else. don't write anything like title. i want to parse the string. just give the json
    `;
    let result = (await model.generateContent(prompt)).response.text();
    result = result.trim().split('\n').slice(1, -1).join('\n');
    return NextResponse.json(JSON.parse(result));
}
  