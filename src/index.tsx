import React from "react";
import ReactDOM from "react-dom/client";
// import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./components/Provider"

import { ThemeProvider } from "next-themes"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
      <App />
     </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

 
