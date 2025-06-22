import Text from './components/Text';
import Title from './components/Title';
import './App.css'
import { Box, Flex } from "@chakra-ui/react";
import logoUrl from './assets/spirital-7a69e459de5e1b6afeb560734ebeffc4.svg';

function App() {
  return (
   
      <Box
          width="100%"
          height="100vh"
          backgroundColor= "black"
          backgroundImage={`url(${logoUrl})`}
          backgroundRepeat="no-repeat"
          backgroundPosition="top"
          backgroundSize="contain"
          padding={"50px"}
        >
          <Flex flexDirection={"column"} width={"50%"} gap={"20px"}>
              <Title>IT Salary Calculator</Title>
              <Text size="20px" fontWeight={400}>
                Each year, our extensive surveys reach out to over 30,000 developers across over 180 countries, representing a diverse range of specialties. With data collected over multiple years, we are able to present a comprehensive analysis of tech trends using the methodology described here.
              </Text>
              <Text size="29px" fontWeight={300}>
                Use our calculator to estimate your income potential based on software developer skills, programming language, location, and experience.
              </Text>
            
        </Flex>
      </Box>
   );
}

export default App;