import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./components/Homepage";
import Purchases from "./components/Purchases";

function App() {
  return (
    <>
      <h1>Expense Tracker</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </>
  );
}

export default App;

// The route to the purchases page should have the production ID
// Because you can grab the id from the url to get the data
// for that specific production
// Create a variable in the route
