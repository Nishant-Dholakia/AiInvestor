export async function GET(req) {
    const api = `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.FINNHUB}`
    const res = await fetch(api)
    const data = await res.json()
    console.log(data)
}