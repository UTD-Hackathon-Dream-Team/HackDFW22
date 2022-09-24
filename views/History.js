import React from "react";
import { Card } from "react-native-ui-lib";
import { Container, Heading, Text, Center, HStack, Avatar } from "native-base";

export default function History() {
  return (
    <Container>
      <Heading style={{ padding: 20 }}>Current Staff</Heading>
      <Card>
        <Center>
          <HStack space={3} justifyContent="center" width="100%">
            <Avatar
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
              size="2xl"
            />
            <Text>Staff Name</Text>
          </HStack>
        </Center>
      </Card>
    </Container>
  );
}
