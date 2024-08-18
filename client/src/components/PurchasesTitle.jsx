import { useState } from "react";

const PurchasesTitle = ({ productions }) => {
  // Trick to check if the async data exists before trying to render the title
  return (
    <div className="purchases-title">
      {productions[0] && productions[0].title}
    </div>
  );
};
export default PurchasesTitle;
