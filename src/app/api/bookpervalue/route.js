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

// Function to calculate book value per share
async function calculateBookValuePerShare() {
    try {
        // Fetch balance sheet to get total equity
        const balanceSheetUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${SYMBOL}&apikey=${process.env.alpha_vintage_key}`;
        const balanceSheetData = await fetchData(balanceSheetUrl);
        const totalEquity = balanceSheetData.annualReports[0].totalShareholderEquity;

        // Fetch company overview to get shares outstanding
        const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${SYMBOL}&apikey=${process.env.alpha_vintage_key}`;
        const overviewData = await fetchData(overviewUrl);
        const sharesOutstanding = overviewData.SharesOutstanding;

        // Calculate book value per share
        const bookValuePerShare = totalEquity / sharesOutstanding;

        // Output the result
        console.log(`Total Equity: $${totalEquity.toLocaleString()}`);
        console.log(`Shares Outstanding: ${sharesOutstanding.toLocaleString()}`);
        console.log(`Book Value Per Share: $${bookValuePerShare.toFixed(2)}`);
        return bookValuePerShare.toFixed(2);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export async function GET(req) {
  const bvps = await calculateBookValuePerShare();
  return NextResponse.json({ message: `${bvps}` });
}
