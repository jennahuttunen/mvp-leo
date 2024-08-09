import PurchasesTable from "./PurchasesTable";
import AddPurchasesForm from "./AddPurchasesForm";
import Navbar from "./GlobalNavbar";
import { useState } from "react";

const Purchases = () => {
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

  const [purchases, setPurchases] = useState([]);
  // Purchases is the array fetched from the db

  const getPurchases = () => {
    alert("You did something!");
  };

  return (
    <div>
      <Navbar links={links} />
      <AddPurchasesForm getPurchases={getPurchases} />
      <PurchasesTable purchases={purchases} />
    </div>
  );
};
export default Purchases;
