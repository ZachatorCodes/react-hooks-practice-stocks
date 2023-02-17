import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [filterBy, setFilterBy] = useState("Tech");
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => {
        console.log(data); // CONSOLE LOG
        setStocks(data);
      });
  }, []);

  const displayedStocks = stocks
    .sort((stock1, stock2) => {
      if (sortBy === "Alphabetically") {
        return stock1.name.localeCompare(stock2.name);
      } else {
        return stock1.price - stock2.price;
      }
    })
    .filter((stock) => {
      return stock.type === filterBy;
    });

  function handleAddStock(addedStock) {
    const canFindStock = portfolio.find((stock) => {
      return stock.id === addedStock.id;
    });
    if (!canFindStock) {
      setPortfolio([...portfolio, addedStock]);
    }
  }

  function handleRemoveStock(removedStock) {
    const updatedPortfolio = portfolio.filter((stock) => {
      return stock.id !== removedStock.id;
    });
    setPortfolio(updatedPortfolio);
  }

  return (
    <div>
      <SearchBar
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setSortBy={setSortBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={displayedStocks}
            onAddStock={handleAddStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
