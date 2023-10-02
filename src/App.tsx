import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <HomePage />
      </>
    </QueryClientProvider>
  );
}

export default App;
