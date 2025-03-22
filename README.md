
# 🚀 **AiInvestor**

AiInvestor is a cutting-edge **Next.js application** designed to deliver **AI-powered financial insights** and tools. With the power of APIs, it fetches and analyzes stock market data, calculates financial metrics, and provides personalized portfolio advice using advanced AI models. 

---

## 🛠 **Getting Started**

To launch the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

## 📊 **API Endpoints**

### **1. Book Value Per Share**
- **Endpoint:** `/api/bookpervalue`
- **Method:** `GET`
- **Response Example:**
```json
{
  "message": "25.34"
}
```

---

### **2. Live Stock Price**
- **Endpoint:** `/api/liveprice`
- **Method:** `GET`
- **Response Example:**
```json
{
  "c": 150.23,
  "h": 152.00,
  "l": 148.50,
  "o": 149.00,
  "pc": 148.00
}
```

---

### **3. P/E Ratio**
- **Endpoint:** `/api/peratio`
- **Method:** `GET`
- **Response Example:**
```json
{
  "message": "18.75"
}
```

---

### **4. Earnings Per Share (EPS)**
- **Endpoint:** `/api/eps`
- **Method:** `GET`
- **Response Example:**
```json
{
  "message": "5.12"
}
```

---

### **5. Portfolio Advisor**
- **Endpoint:** `/api/advisor`
- **Method:** `POST`
- **Request Example:**
```json
{
  "returnData": "12.5",
  "sharpe": "1.2",
  "drawdown": "10",
  "beta": "0.8",
  "exposure": "20",
  "winLoss": "2.5",
  "riskReward": "1.8",
  "holdingPeriod": "30",
  "fomo": "5",
  "panic": "3"
}
```
- **Response Example:**
```json
[
  {
    "advice": "Diversify your portfolio to reduce single stock exposure."
  },
  {
    "advice": "Consider increasing your holding period for better returns."
  }
]
```

