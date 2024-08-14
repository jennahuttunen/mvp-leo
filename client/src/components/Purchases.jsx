import Navbar from "./GlobalNavbar";
import PurchasesTable from "./PurchasesTable";
import AddPurchasesForm from "./AddPurchasesForm";
import PurchasesTitle from "./PurchasesTitle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  // Purchases is the array fetched from the db
  const [productions, setProductions] = useState([]);

  const { production_id } = useParams();
  console.log(purchases[0]);
  // useParams returns an obj; use obj destructuring to access the name of the var we want to use

  // Links for the navbar
  const links = [
    { id: 1, label: "Add Purchase", path: "#add-purchase" },
    { id: 2, label: "Purchases", path: "#purchases-table" },
    {
      id: 3,
      label: "About Me",
      path: "https://linkedin.com/in/leo-bonjo",
      target: "_blank",
    },
  ];

  const getProductions = () => {
    fetch(`/api/productions/${production_id}`)
      .then((res) => res.json()) // Wait to see if the server can satisfy request
      .then((json) => {
        // The data has arrived from the server; now, update productions
        setProductions(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPurchases = () => {
    fetch(`/api/purchases/${production_id}`)
      .then((res) => res.json()) // Wait to see if the server can satisfy request
      .then((json) => {
        // The data has arrived from the server; now, update productions
        setPurchases(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPurchases();
    getProductions();
  }, []);

  return (
    <div>
      <Navbar links={links} />
      <h1 className="purchases-title">Show Title??</h1>
      {/* <PurchasesTitle productions={productions} /> */}
      <AddPurchasesForm
        getPurchases={getPurchases}
        production_id={production_id}
      />
      <PurchasesTable purchases={purchases} />
    </div>
  );
};
export default Purchases;
