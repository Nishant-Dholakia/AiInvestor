const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  income: { type: Number, required: true },
  dob: { type: String, required: true },
  account_number: { type: String, required: true },
  broker: { type: String, required: true },
  joined: { type: String, required: true },
});

const equityHoldingSchema = new mongoose.Schema({
  stock_name: { type: String, required: true },
  ticker: { type: String, required: true },
  average_buy_price: { type: Number, required: true },
  current_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total_investment: { type: Number, required: true },
  current_value: { type: Number, required: true },
  unrealized_profit_loss: { type: Number, required: true },
  percentage_change: { type: Number, required: true },
});

const mutualFundHoldingSchema = new mongoose.Schema({
  fund_name: { type: String, required: true },
  scheme_type: { type: String, required: true },
  nav: { type: Number, required: true },
  sip_amount: { type: Number, required: true },
  units: { type: Number, required: true },
  total_investment: { type: Number, required: true },
  current_value: { type: Number, required: true },
  returns: { type: Number, required: true },
});

const assetAllocationSchema = new mongoose.Schema({
  equities: { type: Number, required: true },
  mutual_funds: { type: Number, required: true },
  bonds: { type: Number, required: true },
  cash_and_cash_equivalents: { type: Number, required: true },
  real_estate: { type: Number, required: true },
});

const portfolioValueSchema = new mongoose.Schema({
  total_investment_value: { type: Number, required: true },
  total_current_value: { type: Number, required: true },
  overall_profit_loss: { type: Number, required: true },
  overall_percentage_change: { type: Number, required: true },
});

const sectorExposureSchema = new mongoose.Schema({
  technology: { type: Number, required: true },
  energy: { type: Number, required: true },
  financial_services: { type: Number, required: true },
  healthcare: { type: Number, required: true },
  consumer_goods: { type: Number, required: true },
});

const assetClassExposureSchema = new mongoose.Schema({
  equities: { type: Number, required: true },
  mutual_funds: { type: Number, required: true },
  bonds: { type: Number, required: true },
});

const diversificationSchema = new mongoose.Schema({
  sector_exposure: { type: sectorExposureSchema, required: true },
  asset_class_exposure: { type: assetClassExposureSchema, required: true },
});

const riskMetricsSchema = new mongoose.Schema({
  portfolio_volatility: { type: Number, required: true },
  sharpe_ratio: { type: Number, required: true },
  beta: { type: Number, required: true },
});

const performanceMetricsSchema = new mongoose.Schema({
  portfolio_return: { type: Number, required: true },
  sharpe_ratio: { type: Number, required: true },
  maximum_drawdown: { type: Number, required: true },
  beta: { type: Number, required: true },
  sector_diversification: { type: Number, required: true },
  single_stock_exposure: { type: Number, required: true },
  win_loss_ratio: { type: Number, required: true },
  risk_reward_ratio: { type: Number, required: true },
  average_holding_period: { type: Number, required: true },
  fomo_trades: { type: Number, required: true },
  panic_selling: { type: Number, required: true },
});

const portfolioSchema = new mongoose.Schema({
  asset_allocation: { type: assetAllocationSchema, required: true },
  equity_holdings: { type: [equityHoldingSchema], required: true },
  mutual_fund_holdings: { type: [mutualFundHoldingSchema], required: true },
  portfolio_value: { type: portfolioValueSchema, required: true },
  diversification: { type: diversificationSchema, required: true },
  risk_metrics: { type: riskMetricsSchema, required: true },
  performance_metrics: { type: performanceMetricsSchema, required: true },
});

const userSchema = new mongoose.Schema({
  user_profile: { type: userProfileSchema, required: true },
  portfolio: { type: portfolioSchema, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
