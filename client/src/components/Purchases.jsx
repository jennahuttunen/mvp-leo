import Navbar from "./GlobalNavbar";
import PurchasesTable from "./PurchasesTable";
import AddPurchasesForm from "./AddPurchasesForm";
import PurchasesTitle from "./PurchasesTitle";
import Footer from "./Footer";
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
    { id: 2, label: "Purchases Table", path: "#purchases-table" },
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
  // req query is when there are key-value pairs added to the end
  // of your url endpoint whereas
  // req param is when variables arer added to the end of your url
  const deletePurchase = async (id) => {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/api/purchases/${id}`, options);
      if (response.ok) {
        // setPurchases(data) would set the state to ALL data;
        // getPurchases uses the GET route that only returns
        // The purchases related to the production id
        getPurchases();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  useEffect(() => {
    getPurchases();
    getProductions();
  }, []);

  return (
    <div>
      <Navbar links={links} />
      <PurchasesTitle productions={productions} />
      <AddPurchasesForm
        getPurchases={getPurchases}
        production_id={production_id}
      />
      <PurchasesTable
        deletePurchase={(id) => deletePurchase(id)}
        purchases={purchases}
      />
      <Footer />
    </div>
  );
};
export default Purchases;
