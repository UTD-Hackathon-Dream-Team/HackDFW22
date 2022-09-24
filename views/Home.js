import React from "react";
import { Container, Center, Text, FlatList, Checkbox } from "native-base";

export default function Home() {
  const goalList = [
    { item: "Do something 1" },
    { item: "Do something 2" },
    { item: "Do something 3" },
  ];

  const resourceList = [
    { item: "Resource 1" },
    { item: "Resource 2" },
    { item: "Resource 3" },
  ];

  return (
    <Center>
      <Container>
        <Text>Home</Text>
        <Text>Today's Goals</Text>
        <FlatList
          data={goalList}
          renderItem={({ item }) => <Checkbox>{item.item}</Checkbox>}
        />
        <Text>Information</Text>
        <FlatList
          data={resourceList}
          renderItem={({ item }) => <Text>{item.item}</Text>}
        />
      </Container>
    </Center>
  );
}
