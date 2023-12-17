"use client";
import { DonutChart } from "@tremor/react";

const valueFormatter = (number) => number;

const DefectTypesDonut = ({ data, colors }) => (
  <DonutChart
    className="mt-6"
    data={data}
    category="count"
    index="name"
    valueFormatter={valueFormatter}
    colors={colors}
    showAnimation={true}
  />
);

export default DefectTypesDonut;
