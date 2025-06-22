import { chakra, HTMLChakraProps  } from "@chakra-ui/react";
import React from "react";
const TextChakra = chakra("p");

export interface TextProps extends HTMLChakraProps<"p"> {
  size?: string | number;
  fontWeight?: string | number;
  children: React.ReactNode;
}

const Text = ({ size, fontWeight, children, ...rest }: TextProps) => (
  <TextChakra
    fontFamily="body"
    fontWeight={fontWeight ?? 400}
    fontSize={size ?? "20px"}
    color="white"
    textAlign="left"
    {...rest}
  >
    {children}
  </TextChakra>
);

export default Text;