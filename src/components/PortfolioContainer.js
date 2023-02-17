import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onRemoveStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock) => {
        return (
          <Stock stock={stock} key={stock.id} onStockClick={onRemoveStock} />
        );
      })}
    </div>
  );
}

export default PortfolioContainer;
