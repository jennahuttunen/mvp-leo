import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import Purchases from "./components/Purchases";
import AddProduction from "./components/AddProduction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/purchases/:production_id" element={<Purchases />} />
        <Route path="/add-production" element={<AddProduction />} />
      </Routes>
    </>
  );
}

export default App;
