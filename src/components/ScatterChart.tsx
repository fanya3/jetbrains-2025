import {
  Chart,
  useChart,
} from "@chakra-ui/charts"
import {
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { Box } from "@chakra-ui/react"
import type { FC } from "react"
import { LanguageData } from "../App"


type SalaryScatterChartProps = {
  entriesData: LanguageData
}

type SeriesItem = {
  label: string
  color: string
}

const experienceColorMap: Record<string, string> = {
  "<1 year": "gray.solid",
  "1–2 years": "orange.solid",
  "3–5 years": "blue.solid",
  "6–10 years": "green.solid",
  "11–16 years": "purple.solid",
  "16+ years": "red.solid"
}

const SalaryScatterChart: FC<SalaryScatterChartProps> = ({ entriesData }) => {
  const transformedData = entriesData?.entries?.map((entry) => ({
    x: entry.value,
    y: entriesData.yGroups.indexOf(entry.category),
    id: entry.category,
    ...entry.metadata
  }))
console.log("entriesData", entriesData)
  const series: SeriesItem[] = Array.from(
    new Set(transformedData.map((d) => d.id))
  ).map((category) => ({
    label: category,
    color: experienceColorMap[category] ?? "gray.solid"
  }))


  const chart = useChart({
    data: transformedData,
    series : series
  })

  const groupedData = chart.groupBy("id")

  return (
    <Box width="100%" height="500px">
      <Chart.Root chart={chart}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 40 }} >
          <XAxis
            type="number"
            dataKey={chart.key("x")}
            stroke={chart.color("border")}
            domain={[0, 100]}
            label={{
              value: "Salary (K/year)",
              position: "insideBottomRight",
              offset: -5
            }}
          />
          <YAxis
            type="number"
            dataKey={chart.key("y")}
            stroke={chart.color("border")}
            tickFormatter={(value) => entriesData.yGroups[value] ?? ""}
            allowDecimals={false}
            label={{
              value: "Experience",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<Chart.Tooltip hideLabel />}
        />
        
          {chart.series.map((series, index) => (
            <Scatter
              key={index}
              name={String(series.label)}
              data={groupedData[index]}
              fill={chart.color(series.color)}
              isAnimationActive={false}
              line={{ stroke: chart.color(series.color) }}
            />
          ))}
        </ScatterChart>
      </Chart.Root>
    </Box>
  )
}

export default SalaryScatterChart
