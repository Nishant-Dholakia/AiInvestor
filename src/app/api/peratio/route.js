import { NextResponse } from "next/server";
const SYMBOL = "AAPL"; 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function calculatePERatio() {
    try {
        const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${process.env.alpha_vintage_key}`;
        const priceData = await fetchData(priceUrl);
        const marketPrice = parseFloat(priceData["Global Quote"]["05. price"]);

        // Fetch EPS from the company overview
        const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${SYMBOL}&apikey=${process.env.alpha_vintage_key}`;
        const overviewData = await fetchData(overviewUrl);
        const eps = parseFloat(overviewData.EPS);

        // Calculate P/E Ratio
        const peRatio = marketPrice / eps;

        // Output the result
        console.log(`Market Price Per Share: $${marketPrice.toFixed(2)}`);
        console.log(`EPS: $${eps.toFixed(2)}`);
        console.log(`P/E Ratio: ${peRatio.toFixed(2)}`);
        return peRatio.toFixed(2)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Run the function

export async function GET(req) {
    const peratio = await calculatePERatio();
    return NextResponse.json({ message: `${peratio}` });
}
