import React, { useMemo, useState } from 'react';
import Text from './components/Text';
import Title from './components/Title';
import Card from './components/Card';
import { Box, Flex, Portal, Select, createListCollection } from "@chakra-ui/react";
import logoUrl from './assets/spirital-7a69e459de5e1b6afeb560734ebeffc4.svg';
import rawCalculatorData from './data/calculatorData.json';
import SalaryScatterChart from './components/ScatterChart';

// --- Types ---
type Items = {
  label: string;
  value: string;
};

type Metadata = {
  Country: string;
  Language: string;
  Experience: string;
  Salary: string;
};

type Entry = {
  value: number;
  category: string;
  metadata: Metadata;
};

export type LanguageData = {
  entries: Entry[];
  yGroups: string[]
  xRange: string[]
};

type CalculatorData = {
  [country: string]: {
    [language: string]: LanguageData;
  };
};

// --- Cast JSON with explicit type ---
const calculatorData = rawCalculatorData as CalculatorData;

function App() {
  // Extract countries and languages
  const allCountries = useMemo(() => {
    const items: Items[] = Object.keys(calculatorData).map(country => ({
      label: country,
      value: country,
    }));
    return createListCollection({ items });
  }, []);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    Object.values(calculatorData).forEach(country =>
      Object.keys(country).forEach(lang => langs.add(lang))
    );
    const items: Items[] = Array.from(langs).map(lang => ({
      label: lang,
      value: lang,
    }));
    return createListCollection({ items });
  }, []);

  // State
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    allCountries.items?.[0]?.value ?? null
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    allLanguages.items?.[0]?.value ?? null
  );

  const isReady = Boolean(
    allLanguages.items.length &&
    allCountries.items.length &&
    selectedLanguage &&
    selectedCountry
  );

  // Data entries
  const entriesData  = useMemo(() => {
    if (selectedCountry && selectedLanguage) {
      return calculatorData[selectedCountry]?.[selectedLanguage] ?? [];
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
        <Card flex={1} number={1} title={"Enter your programming language, and country."}>
          <Text size="11px" fontWeight={300}>
            Use our calculator to estimate your income potential based on software developer skills, programming language, location, and experience.
          </Text>

          {isReady && (
            <Box mt={4} width="100%">
              {/* Select Language */}
              <Select.Root
                collection={allLanguages}
                onChange={(e: { target: { value: string; }; }) => {
                  setSelectedLanguage( e?.target?.value as string)
                }}
                color="white"
                selectedKey={selectedLanguage ?? undefined}
                defaultValue={allCountries.items?.[0]?.value}
              >
                <Select.HiddenSelect />
                <Select.Label>Select programming language</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={allLanguages.items?.[0]?.value || "Select programming language"} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {allLanguages.items.map((item: Items) => (
                        <Select.Item key={item.value} item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              {/* Select Country */}
              <Select.Root
                collection={allCountries}
                onChange={(e: { target: { value: string; }; }) => {
                  setSelectedCountry( e?.target?.value as string)
                }}
                color="white"
                defaultValue={allCountries.items?.[0]?.value}
                selectedKey={selectedCountry ?? undefined}
                marginTop="10px"
              >
                <Select.HiddenSelect />
                <Select.Label>Select a country</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={allCountries.items?.[0]?.value || "Select country"} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {allCountries.items.map((item: Items) => (
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
            <SalaryScatterChart entriesData={entriesData as LanguageData} />
          </Box>
        </Card>
      </Flex>
    </Box>
  );
}

export default App;
