import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { system } from "../theme";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider(props:ProviderProps) {
  return (
     <ChakraProvider value={system}>
      <ThemeProvider>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  ) 

} 
