import React from "react";
import { Container, Center, Text } from "native-base";
import CheckList from "../components/CheckList";

export default function Goals() {
  let testlist = ["test", "test2"];
  return (
    <Center>
      <Container>
        <Text>Goals</Text>
        <CheckList itemslist={testlist}></CheckList>
      </Container>
    </Center>
  );
}
