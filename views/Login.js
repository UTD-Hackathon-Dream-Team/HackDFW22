import React from "react";
import { Button, Center, Container } from "native-base";

export default function Home({ navigation }) {
  return (
    <Center>
      <Container>
        <Button shadow={2} onPress={() => navigation.navigate("Root")}>
          Click me
        </Button>
        <Button shadow={2} onPress={() => navigation.navigate("Root")}>
          Click me
        </Button>
      </Container>
    </Center>
  );
}
