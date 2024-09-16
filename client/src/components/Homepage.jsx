import React, { useState, useEffect } from 'react';
import GlobalNavbar from './GlobalNavbar';
import Hero from './Hero';
import ProductionGrid from './ProductionGrid';
import AddProduction from './AddProduction';
import BarChart from './BarChart'; 
import Footer from './Footer';

const Homepage = () => {
  const links = [
    { id: 2, label: "Productions", path: "#production-grid" },
    { id: 1, label: "Add Production", path: "#add-production" },
    { id: 3, label: "Vendor Spending", path: "#vendor-spending" }, 
  ];

  const [productions, setProductions] = useState([]);

  const getProductions = () => {
    fetch("/api/productions")
      .then((res) => res.json())
      .then((json) => setProductions(json))
      .catch((error) => console.log(error));
  };

  const deleteProduction = async (id) => {
    let options = { method: "DELETE" };
    try {
      let response = await fetch(`/api/productions/${id}`, options);
      if (response.ok) {
        let data = await response.json();
        setProductions(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  useEffect(() => {
    getProductions();
  }, []);

  return (
    <div id="homepage" className="container-fluid">
      <GlobalNavbar links={links} />
      <Hero />
      <ProductionGrid productions={productions} deleteProduction={(id) => deleteProduction(id)}/>
      <AddProduction getProductions={getProductions} />
      <BarChart /> 
      <Footer />
    </div>
  );
};

export default Homepage;
