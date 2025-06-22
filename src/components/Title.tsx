import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import React from "react";

// Création du composant de type <h1>
const TitleChakra = chakra("h1");

type TitleProps = HTMLChakraProps<"h1"> & {
  children: React.ReactNode;
};

const Title = ({ children, ...rest }: TitleProps) => (
  <TitleChakra
    fontFamily="body"
    fontWeight={600}
    fontSize="72px"
    lineHeight="72px"
    color="white"
    {...rest}
  >
    {children}
  </TitleChakra>
);

export default Title;