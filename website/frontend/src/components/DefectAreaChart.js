"use client";
import { AreaChart, Card, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    "Defects count": 2890,
  },
  {
    date: "Feb 22",
    "Defects count": 2756,
  },
  {
    date: "Mar 22",
    "Defects count": 3322,
  },
  {
    date: "Apr 22",
    "Defects count": 3470,
  },
  {
    date: "May 22",
    "Defects count": 3475,
  },
  {
    date: "Jun 22",
    "Defects count": 3129,
  },
];

const valueFormatter = function(number) {
  // return "$ " + new Intl.NumberFormat("us").format(number).toString();
  return number;
};

const DefectAreaChart = () => (
  <Card>
    <Title>General</Title>
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["Defects count"]}
      colors={["indigo"]}
      valueFormatter={valueFormatter}
    />
  </Card>
);

export default DefectAreaChart;
