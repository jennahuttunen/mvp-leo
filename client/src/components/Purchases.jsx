import PurchasesTable from "./PurchasesTable";
import AddPurchasesForm from "./AddPurchasesForm";
import Navbar from "./GlobalNavbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  // Purchases is the array fetched from the db
  const { production_id } = useParams();

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

  const getPurchases = () => {
    fetch("/api/purchases")
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
  }, []);

  return (
    <div>
      <Navbar links={links} />

      <AddPurchasesForm
        getPurchases={getPurchases}
        production_id={production_id}
      />
      <PurchasesTable purchases={purchases} />
    </div>
  );
};
export default Purchases;
