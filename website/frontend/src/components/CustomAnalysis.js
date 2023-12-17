import { Button, Card, Flex, Title } from "@tremor/react";

const CustomAnalysis = () => (
  <Card>
    <Title>Получить анализ для данных с ПК</Title>
    <Flex justifyContent="center" flexDirection="col" className="mt-6">
      <Button className="mt-10">Загрузить картинку или архив</Button>
    </Flex>
  </Card>
);

export default CustomAnalysis;
