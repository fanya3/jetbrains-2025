import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes"
import App from "./App";
import { system } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Utilise le thème personnalisé via `value` */}
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
      <App />
     </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);