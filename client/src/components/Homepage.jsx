import "./Homepage.css";
import ProductionGrid from "./ProductionGrid";
import AddProduction from "./AddProduction";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [productions, setProductions] = useState([]);
  // Productions is the array fetched from the db which will replace []

  const getProductions = () => {
    fetch("/api/productions")
      .then((res) => res.json()) // Wait to see if the server can satisfy request
      .then((json) => {
        // The data has arrived from the server; now, update productions
        setProductions(json);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  };

  useEffect(() => {
    getProductions();
  }, []); // How do I make the useEffect refetch every time a production is added?

  return (
    <div className="container-fluid">
      <h1>Home Page</h1>
      <ProductionGrid productions={productions} />
      <AddProduction getProductions={getProductions} />
    </div>
  );
};
export default Homepage;
