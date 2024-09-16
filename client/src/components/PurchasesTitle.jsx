import { useState } from "react";

const PurchasesTitle = ({ productions }) => {
  return (
    <div className="purchases-title">
      {productions[0] && productions[0].title}
    </div>
  );
};
export default PurchasesTitle;