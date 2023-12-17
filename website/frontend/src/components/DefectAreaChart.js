"use client";
import { AreaChart, Card, Title, DateRangePicker, Flex, DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import { useState } from "react";

const DefectAreaChart = ({ chartdata }) => {
  const [value, setValue] = useState({
    from: new Date(2023, 10, 17),
    to: new Date(),
  });

  const [chartValue, setChartValue] = useState(null);

  return <Card>
    <Flex flexDirection="col" alignItems="start" className="mt-6">
      <DateRangePicker
        className="ml-0 mr-4"
        value={value}
        onValueChange={setValue}
        color="rose"
      >
      </DateRangePicker>
    </Flex>
    <AreaChart
      data={chartdata}
      index={"day"}
      categories={["a", "b", "c", "d", "e"]}
      showAnimation={true}
      showGradient={true}
      className="m-auto"
      yAxisWidth={40}
      onValueChange={(v) => setChartValue(v)}
      connectNulls={true}
    />
  </Card>
};

export default DefectAreaChart;
