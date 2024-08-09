import PurchasesTable from "./PurchasesTable";
import AddPurchasesForm from "./AddPurchasesForm";
import Navbar from "./GlobalNavbar";
const Purchases = () => {
  // Links for the navbar
  const links = [
    { id: 1, label: "Add Purchase", path: "#add-purchase", target: "" },
    { id: 2, label: "Purchases", path: "#purchases-table", target: "" },
  ];

  return (
    <div>
      <Navbar links={links} />
      <AddPurchasesForm />
      <PurchasesTable />
    </div>
  );
};
export default Purchases;
