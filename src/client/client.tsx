import "./styles.css";
import { createRoot } from "react-dom/client";
import Counter from "./components/Counter";

function App() {
  return (
    <main>
      <h1>🎈 Welcome to Memory-web!</h1>
      <Counter />
    </main>
  );
}

createRoot(document.getElementById("app")!).render(<App />);