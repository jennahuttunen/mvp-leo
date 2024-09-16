import Navbar from "./GlobalNavbar";
import PurchasesTable from "./PurchasesTable";
import AddPurchasesForm from "./AddPurchasesForm";
import PurchasesTitle from "./PurchasesTitle";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPurchases from "./EditPurchases";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [productions, setProductions] = useState([]);
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { production_id } = useParams();

  const links = [
    { id: 1, label: "Productions", path: "/" }, 
    { id: 2, label: "Add Purchase", path: "#add-purchase" },
    { id: 3, label: "Purchases", path: "#purchases-table" },
  ];

  const getProductions = () => {
    fetch(`/api/productions/${production_id}`)
      .then((res) => res.json())
      .then((json) => {
        setProductions(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPurchases = () => {
    fetch(`/api/purchases/${production_id}`)
      .then((res) => res.json())
      .then((json) => {
        setPurchases(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePurchase = async (id) => {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/api/purchases/${id}`, options);
      if (response.ok) {
        getPurchases();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setShowEditModal(true);
  };

  const handleUpdate = async (id, updatedData) => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    };
    try {
      let response = await fetch(`/api/purchases/${id}`, options);
      if (response.ok) {
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
      <AddPurchasesForm getPurchases={getPurchases} production_id={production_id}/>
      <PurchasesTable 
        deletePurchase={deletePurchase} 
        purchases={purchases}
        productionTitle={productions.length > 0 ? productions[0].title : "No Title Available"}
        openEditModal={handleEdit}
      />
      <Footer />
      {showEditModal && (
        <EditPurchases 
          show={showEditModal} 
          handleClose={() => setShowEditModal(false)}
          purchase={editingPurchase}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Purchases;
