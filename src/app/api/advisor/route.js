import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMMIAPI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function POST(req) {
    try {
      const body = await req.json(); // Parse JSON body directly
      console.log("Parsed Body:", body);
  
      const {
        portfolio_return, sharpe_ratio, maximum_drawdown, beta, sector_diversification, single_stock_exposure,
        win_loss_ratio, risk_reward_ratio, average_holding_period, fomo_trades, panic_selling
      } = body;  // Extract parameters from the parsed object
  
      const prompt = `
      Portfolio Return: ${portfolio_return}%
      Sharpe Ratio: ${sharpe_ratio}
      Maximum Drawdown: ${maximum_drawdown}%
      Beta: ${beta}
      Sector Diversification: ${sector_diversification}
      Single Stock Exposure: ${single_stock_exposure}%
      Win/Loss Ratio: ${win_loss_ratio}
      Risk-Reward Ratio: ${risk_reward_ratio}
      Average Holding Period: ${average_holding_period} days
      FOMO Trades: ${fomo_trades}%
      Panic Selling: ${panic_selling}%    
  
      The following is the portfolio performance for a person. Provide advice related to it in JSON format with an array of advice objects. Output JSON only, nothing else. Don't write variables syntax in the answer, just write the absolute value for each parameter.
      `;
  
      let result = (await model.generateContent(prompt)).response.text();
      result = result.trim();
      if (result.startsWith('```json')) {
        result = result.replace(/```json/, '').replace(/```$/, '').trim();  // Remove code block markers
      }
  
      const jsonResponse = JSON.parse(result.trim());  // Convert AI response to JSON
      return NextResponse.json(jsonResponse);  // Send JSON response to client
    } catch (error) {
      console.error("Error handling POST request:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }