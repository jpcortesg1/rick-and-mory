import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Character from "./pages/character/Character";
import Home from "./pages/home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/locations" element={<Home />} />
        <Route path="/episodes" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
