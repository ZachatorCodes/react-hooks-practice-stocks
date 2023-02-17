import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onAddStock }) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => {
        return <Stock stock={stock} key={stock.id} onStockClick={onAddStock} />;
      })}
    </div>
  );
}

export default StockContainer;
