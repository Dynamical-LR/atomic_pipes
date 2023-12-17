import { Grid, Col, Card, Title, List, Flex, Text, Callout, ListItem } from "@tremor/react";
import DefectAreaChart from "@/components/DefectAreaChart.js";
import DefectTypesDonut from "@/components/DefectTypesDonut.js";
import CustomAnalysis from "@/components/CustomAnalysis";
import Image from "next/image";

const getStatistics = async () => {
  const resp = await fetch("https://dc4d-87-116-164-65.ngrok-free.app/statitistics");
  if (!resp.ok) {
    throw new Error('Failed to fetch data')
  }

  return resp.json()
}

const Page = async () => {
  const defects = ["a", "b", "c", "d", "e"];

  const statistics = await getStatistics();
  const total_defects_count = statistics["detects"].reduce((acc, detect) => acc + detect["defects"].reduce((acc, i) => acc + i, 0), 0)
  const defects_ratio = [
    {
      name: "valid",
      count: statistics["total"] - total_defects_count,
    },
    {
      name: "defect",
      count: total_defects_count,
    },
  ];
  const defects_counts = [0, 0, 0, 0, 0];

  for (let detect of statistics["detects"]) {
    for (let i = 0; i < defects_counts.length; i++) {
      defects_counts[i] += detect["defects"][i];
    }
  }

  const defect2count = [];

  for (const [idx, cnt] of defects_counts.entries()) {
    defect2count.push({ "name": defects[idx], "count": cnt });
  }

  return <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-2 m-2">
    <Col numColSpan={1} numColSpanLg={4}>
      <Card>
        <Title>
          Dynamical LR
        </Title>
      </Card>
    </Col>
    <Col numColSpan={1} numColSpanLg={3}>
      <DefectAreaChart chartdata={statistics["detects"].map(d => ({ day: d["day"], a: d["defects"][0], b: d["defects"][1], c: d["defects"][2], d: d["defects"][3], e: d["defects"][4] }))} />
    </Col>
    <Card>
      <Title className="mb-4">Последний обнаруженный дефект</Title>
      <Image src="/image.png"
        width={600}
        height={900}
      />
      <Callout
        className="mt-8"
        title="Вмятина"
        color="teal">
        19:30 17.12.2023
      </Callout>
    </Card>
    <Card className="pt-0">
      <DefectTypesDonut data={defects_ratio} colors={["slate", "red"]} />
      <Text className="mt-4">Количество дефектов среди проанализированных фото</Text>
    </Card>
    <Card className="pt-0">
      <DefectTypesDonut data={defect2count} />
      <Text className="mt-4">Количественное отношение дефектов</Text>
    </Card>
    <Card>
      <Title>Общая статистика</Title>
      <List>
        <ListItem></ListItem>
      </List>
    </Card>
    <CustomAnalysis />
  </Grid>
};

export default Page;
