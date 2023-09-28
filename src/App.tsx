import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <h1>Test</h1>
        <HomePage />
      </>
    </QueryClientProvider>
  );
}

export default App;
