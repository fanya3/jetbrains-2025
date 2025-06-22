import { Box } from "@chakra-ui/react";
import Text from "./Text";
import React from "react";

interface CardProps {
  number: string | number;
  title: string;
  flex?: number | string;
  children?: React.ReactNode;
}

const Card = ({ number, title, flex, children }: CardProps) => (
  <Box
    borderRadius="24px"
    padding="24px"
    background="linear-gradient(180deg, #6B57FF 0%,  #232323 40%, #232323 100%)"
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    gap="12px"
    flex={flex}
  >
    <Text size="35px" fontWeight={500}>{number}</Text>
    <Text size="20px" fontWeight={400}>{title}</Text>
    {children}
  </Box>
);

export default Card;