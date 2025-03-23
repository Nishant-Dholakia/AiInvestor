import { NextResponse } from "next/server";

export async function POST() {
    const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/screeners/list?region=US&quoteType=MUTUALFUND&size=50&offset=0&sortField=fundnetassets&sortType=DESC";
    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY, 
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "Content-Type": "application/json",
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}