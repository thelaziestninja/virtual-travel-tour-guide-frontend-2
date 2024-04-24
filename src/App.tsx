import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import DestinationPage from "./pages/DestinationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
