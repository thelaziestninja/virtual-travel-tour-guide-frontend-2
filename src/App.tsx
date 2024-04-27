import "./App.css";
import HomePage from "./pages/HomePage";
import { Provider as JotaiProvider } from "jotai";
import DestinationPage from "./pages/DestinationPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destination/:id" element={<DestinationPage />} />
          </Routes>
        </Router>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
