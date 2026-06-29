
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import { HelmetProvider } from "react-helmet-async";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
