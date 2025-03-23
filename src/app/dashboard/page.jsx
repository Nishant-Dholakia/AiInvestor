"use client";
import AssetAllocationChart from "../component/ui/Pie";
import PortfolioGrowthChart from "../component/ui/Chart";
import SectorExposureChart from "../component/ui/donut";
import AnimatedCard from "../component/ui/animatedCard";
import { userData } from "@/app/data/user";
import PerformanceMetricsChart from "../component/ui/Radar";
import EquityHoldingsChart from "../component/ui/equity";
import MutualFundHoldingsChart from "../component/ui/mutual";
import { useEffect, useState } from "react";
const Dashboard = ({ portfolioData }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("angelOneAuthToken");

    if (authToken) {
      fetchUserData(authToken);
    } else {
      console.error("Auth token not found");
      window.location.href = "/";
    }
  }, []);
  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch("/api/fetchUserData", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          'Accept': "application/json",
          "X-PrivateKey": `${process.env.PUBLISHER_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-end">
        <AnimatedCard>
          <h2>Asset Allocation</h2>
          <AssetAllocationChart
            assetAllocation={portfolioData.portfolio.asset_allocation}
          />
        </AnimatedCard>

        <AnimatedCard>
          <h2>Portfolio Growth</h2>
          <PortfolioGrowthChart
            portfolioValue={portfolioData.portfolio.portfolio_value}
          />
        </AnimatedCard>

        <AnimatedCard>
          <h2>Sector Exposure</h2>
          <SectorExposureChart
            sectorExposure={
              portfolioData.portfolio.diversification.sector_exposure
            }
          />
        </AnimatedCard>
      </div>
      <div className="flex  flex-wap justify-end gap-4">
        <AnimatedCard>
          <h2>Performance Metrics</h2>
          <PerformanceMetricsChart
            performanceMetrics={portfolioData.portfolio.performance_metrics}
          />
        </AnimatedCard>

        <AnimatedCard>
          <h2>Equity Holdings</h2>
          <EquityHoldingsChart
            equityHoldings={portfolioData.portfolio.equity_holdings}
          />
        </AnimatedCard>

        <AnimatedCard>
          <h2>Mutual Fund Holdings</h2>
          <MutualFundHoldingsChart
            mutualFundHoldings={portfolioData.portfolio.mutual_fund_holdings}
          />
        </AnimatedCard>
      </div>
    </>
  );
};

const page = () => {
  // console.log(userData)
  return <Dashboard portfolioData={userData} />;
};

export default page;
