import ProductionGrid from "./ProductionGrid";
import AddProduction from "./AddProduction";
import GlobalNavbar from "./GlobalNavbar";
import Hero from "./Hero";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const Homepage = () => {
  // Create links obj to pass to Global Navbar
  const links = [
    { id: 1, label: "Add Production", path: "#add-production" },
    { id: 2, label: "Productions", path: "#production-grid" },
  ];

  const [productions, setProductions] = useState([]);
  // Productions is the array fetched from the db which will replace []
  /// Every 500 means a server side error - first check the terminal running the backend
  const getProductions = () => {
    fetch("/api/productions")
      .then((res) => res.json()) // Wait to see if the server can satisfy request
      .then((json) => {
        // The data has arrived from the server; now, update productions
        setProductions(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduction = async (id) => {
    let options = {
      method: "DELETE",
    };
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
      <ProductionGrid
        productions={productions}
        deleteProduction={(id) => deleteProduction(id)}
      />
      <AddProduction getProductions={getProductions} />
      <Footer />
    </div>
  );
};
export default Homepage;
