export default function getDummyData()
{
    return {
      "user_profile": {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+1-555-123-4567",
        "income": 85000,
        "dob": "1990-06-15",
        "account_number": "1234567890",
        "broker": "Robinhood",
        "joined": "2020-05-01"
      },
      "portfolio": {
        "asset_allocation": {
          "equities": 45.5,
          "mutual_funds": 30.2,
          "bonds": 15.0,
          "cash_and_cash_equivalents": 9.3,
          "real_estate": 0.0
        },
        "equity_holdings": [
          {
            "stock_name": "Tata Consultancy Services",
            "ticker": "TCS",
            "average_buy_price": 3200,
            "current_price": 3500,
            "quantity": 10,
            "total_investment": 32000,
            "current_value": 35000,
            "unrealized_profit_loss": 3000,
            "percentage_change": 9.4
          },
          {
            "stock_name": "Reliance Industries",
            "ticker": "RELIANCE",
            "average_buy_price": 2400,
            "current_price": 2300,
            "quantity": 15,
            "total_investment": 36000,
            "current_value": 34500,
            "unrealized_profit_loss": -1500,
            "percentage_change": -4.17
          }
        ],
        "mutual_fund_holdings": [
          {
            "fund_name": "Axis Bluechip Fund",
            "scheme_type": "Equity Large Cap",
            "nav": 45.25,
            "sip_amount": 2000,
            "units": 200,
            "total_investment": 9000,
            "current_value": 9050,
            "returns": 0.56
          },
          {
            "fund_name": "HDFC Hybrid Fund",
            "scheme_type": "Hybrid Aggressive",
            "nav": 120.15,
            "sip_amount": 3000,
            "units": 100,
            "total_investment": 12000,
            "current_value": 12500,
            "returns": 4.17
          }
        ],
        "sell_transactions": [
          {
            "ticker": "TCS",
            "sell_price": 3600,
            "quantity": 5,
            "sell_date": "2024-03-01",
            "buy_price": 3200,
            "buy_date": "2023-05-01",
            "holding_period_days": 305,
            "profit_loss": 2000,
            
          },
          {
            "ticker": "RELIANCE",
            "sell_price": 2200,
            "quantity": 10,
            "sell_date": "2024-02-15",
            "buy_price": 2400,
            "buy_date": "2024-01-15",
            "holding_period_days": 31,
            "profit_loss": -2000,
          }
        ],
        "dividends": [
          {
            "stock_name": "TCS",
            "ticker": "TCS",
            "amount": 5000,
            "date": "2024-02-01",
          },
          {
            "stock_name": "Reliance Industries",
            "ticker": "RELIANCE",
            "amount": 3000,
            "date": "2023-10-01",
          }
        ],
        "portfolio_value": {
          "total_investment_value": 89000,
          "total_current_value": 92050,
          "overall_profit_loss": 3050,
          "overall_percentage_change": 3.43
        },
        "diversification": {
          "sector_exposure": {
            "technology": 40.0,
            "energy": 15.0,
            "financial_services": 25.0,
            "healthcare": 10.0,
            "consumer_goods": 10.0
          },
          "asset_class_exposure": {
            "equities": 60.0,
            "mutual_funds": 30.0,
            "bonds": 10.0
          }
        },
        "risk_metrics": {
          "portfolio_volatility": 18.7,
          "sharpe_ratio": 0.85,
          "beta": 1.2
        },
        "performance_metrics": {
          "portfolio_return": 3.43,
          "sharpe_ratio": 0.8,
          "maximum_drawdown": 30,
          "beta": 1.2,
          "sector_diversification": 70,
          "single_stock_exposure": 20,
          "win_loss_ratio": 1.2,
          "risk_reward_ratio": 1.5,
          "average_holding_period": 90,
          "fomo_trades": 15,
          "panic_selling": 20
        }
      }
    }
    
}