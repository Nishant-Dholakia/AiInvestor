import { NextResponse } from "next/server"

export async function GET(req) {
   const api = `https://finnhub.io/api/v1/search?q=apple&exchange=US&token=${process.env.FINNHUB}`
    const res = await fetch(api)
    const data = await res.json()
    return NextResponse.json(data)
}
