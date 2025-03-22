import { NextResponse } from "next/server";
const SYMBOL = "AAPL"; // Replace with the stock symbol you want to analyze

// Function to fetch data from the API
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// Function to calculate EPS
async function calculateEPS() {
    try {
        // Fetch income statement to get net income
        const incomeStatementUrl = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${SYMBOL}&apikey=${process.env.alpha_vintage_key}`;
        const incomeStatementData = await fetchData(incomeStatementUrl);
        const netIncome = incomeStatementData.annualReports[0].netIncome;

        // Fetch company overview to get shares outstanding
        const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${SYMBOL}&apikey=${process.env.alpha_vintage_key}`;
        const overviewData = await fetchData(overviewUrl);
        const sharesOutstanding = overviewData.SharesOutstanding;

        // Calculate EPS
        const eps = netIncome / sharesOutstanding;

        // Output the result
        console.log(`Net Income: $${netIncome.toLocaleString()}`);
        console.log(`Shares Outstanding: ${sharesOutstanding.toLocaleString()}`);
        console.log(`EPS: $${eps.toFixed(2)}`);
        return eps.toFixed(2);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function GET(req) {
  const eps = await calculateEPS();
  return NextResponse.json({ message: `${eps}` });
}
