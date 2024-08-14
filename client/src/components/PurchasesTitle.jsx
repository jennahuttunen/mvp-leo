import { useState } from "react";

const PurchasesTitle = ({ productions }) => {
  console.log(productions);
  return <div>{productions[0].title}</div>;
};
export default PurchasesTitle;
