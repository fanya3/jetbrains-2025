import React, { useMemo, useState } from 'react';
import Text from './components/Text';
import Title from './components/Title';
import Card from './components/Card';
import { Box, Flex, Portal, Select, createListCollection } from "@chakra-ui/react";
import logoUrl from './assets/spirital-7a69e459de5e1b6afeb560734ebeffc4.svg';
import calculatorData from './data/calculatorData.json';
import SalaryScatterChart from './components/ScatterChart'

function App() {
  // Extract countries and languages as list collections
  const allCountries = useMemo(() => {
    const items = Object.keys(calculatorData).map((country, index) => ({
      label: country,
      value: country,
    }));
    return createListCollection({ items });
  }, []);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    Object.values(calculatorData).forEach((country: any) => {
      Object.keys(country).forEach(lang => langs.add(lang));
    });
    const items = Array.from(langs).map((lang) => ({
      label: lang,
      value: lang,
    }));
    return createListCollection({ items });
  }, []);

  // Always keep selectedCountry and selectedLanguage in sync with available options
  const [selectedCountry, setSelectedCountry] = useState<string | null>(allCountries.items[0].value || null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(allLanguages.items[0].value || null);

  const isReady =
    allLanguages.items.length > 0 &&
    allCountries.items.length > 0 &&
    selectedLanguage &&
    selectedCountry

  // Get entries for the selected country and language
  const entriesData = useMemo(() => {
    if (
      selectedCountry &&
      selectedLanguage  
    ) {
      return calculatorData[selectedCountry][selectedLanguage];
    }
    return [];
  }, [selectedCountry, selectedLanguage]);

  return (
    <Box
      width="100%"
      height="100%"
      backgroundColor="black"
      backgroundImage={`url(${logoUrl})`}
      backgroundRepeat="no-repeat"
      backgroundPosition="right top"
      backgroundSize="60% auto"
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

      <Flex flexDirection={"row"} width={"100%"} gap={"20px"} marginTop={"50px"}>
        <Card flex={1} number={1} title={"Enter your programming language, and country."}>
          <Text size="11px" fontWeight={300}>
            Use our calculator to estimate your income potential based on software developer skills, programming language, location, and experience.
          </Text>

          {isReady && selectedLanguage &&  (
            <Box mt={4} width="100%">
              <Select.Root
                collection={allLanguages}
                onChange={(e) => {
                  setSelectedLanguage( e.target.value as string)
                }}
                color="white"
                selectedKey={selectedLanguage || allCountries?.items?.[0].value}
                defaultValue={selectedLanguage}
              >
                <Select.HiddenSelect />
                <Select.Label >Select programming language</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={selectedLanguage || "Select programming language"} />
                  </Select.Trigger>
                  <Select.IndicatorGroup  >
                    <Select.Indicator  />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content >
                      {allLanguages.items.map((item) => (
                        <Select.Item key={item.value} item={item}  >
                          <Select.ItemText >{item.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              <Select.Root
                collection={allCountries}
                selectedKey={selectedCountry || allCountries?.items?.[0].value}
                onChange={(e) => {
                  setSelectedCountry( e.target.value as string)
                }}
                color="white"
                marginTop="10px"
                 defaultValue={selectedCountry}
              >
                <Select.HiddenSelect />
                <Select.Label color="white">Select a country</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={selectedCountry || "Select country"} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {allCountries.items.map((item) => (
                        <Select.Item key={item.value} item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Box>
          )}
        </Card>

        <Card flex={2} number={2} title={"Calculate the salary range based on your parameters."}>
          <Box
            borderRadius="24px"
            padding="24px"
            background="white"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="12px"
            width="100%"
          >
            <SalaryScatterChart entriesData={entriesData} />
          </Box>
        </Card>
      </Flex>
    </Box>
  );
}

export default App;