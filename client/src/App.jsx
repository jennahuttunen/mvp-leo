import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./Homepage";
import AddProduction from "./AddProduction";
import ProductionGrid from "./ProductionGrid";

function App() {
  const [productions, setProductions] = useState([]);

  const handleAddProduction = (newProd) => {
    let newProductions = [...productions];
    newProductions.push(newProd);
    setProductions((state) => [...state, newProd]);
  };

  return (
    <>
      <h1>Expense Tracker</h1>
      <Homepage />
      <ProductionGrid productions={productions} />
      <AddProduction
        addProduction={(newProd) => handleAddProduction(newProd)}
      />
    </>
  );
}

export default App;
