import { Grid, Col, Card, Title, List, ListItem } from "@tremor/react";
import DefectAreaChart from "@/components/DefectAreaChart.js";
import DefectTypesDonut from "@/components/DefectTypesDonut.js";
import CustomAnalysis from "@/components/CustomAnalysis";

const cities = [
  {
    name: "New York",
    count: 9800,
  },
  {
    name: "London",
    count: 4567,
  },
  {
    name: "Hong Kong",
    count: 3908,
  },
  {
    name: "San Francisco",
    count: 2400,
  },
  {
    name: "Singapore",
    count: 1908,
  },
  {
    name: "Zurich",
    count: 1398,
  },
];

const statisitcs = [
  {
    city: "Athens",
    rating: "2 open PR",
  },
  {
    city: "Luzern",
    rating: "1 open PR",
  },
  {
    city: "Zürich",
    rating: "0 open PR",
  },
  {
    city: "Vienna",
    rating: "1 open PR",
  },
  {
    city: "Ermatingen",
    rating: "0 open PR",
  },
  {
    city: "Lisbon",
    rating: "0 open PR",
  },
];

const defects_ratio = [
  {
    name: "valid",
    count: 5000,
  },
  {
    name: "defect",
    count: 1000,
  },
];

const Page = () => (
  <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2 ">
    <Col numColSpan={1} numColSpanLg={2}>
      <DefectAreaChart />
    </Col>
    <Card>
      <Title>Statistics</Title>
      <List>
        {statisitcs.map((item) => (
          <ListItem key={item.city}>
            <span>{item.city}</span>
            <span>{item.rating}</span>
          </ListItem>
        ))}
      </List>

    </Card>
    <Col>
      <Card>
        <Title>Total defects count ratio</Title>
        <DefectTypesDonut data={defects_ratio} colors={["slate", "red"]} />
      </Card>
    </Col>
    <Card>
      <Title>Defect types</Title>
      <DefectTypesDonut data={cities} colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]} />
    </Card>
    <CustomAnalysis />
  </Grid>
);

export default Page;
