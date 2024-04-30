import "./App.css";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  console.log("App component rendered");
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
