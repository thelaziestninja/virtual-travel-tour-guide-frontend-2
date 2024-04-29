import "./App.css";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destination/:id" element={<DestinationPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
