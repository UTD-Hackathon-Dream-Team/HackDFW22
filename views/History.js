import React from "react";
import { Card } from "react-native-paper";
import {
  Container,
  VStack,
  Heading,
  Text,
  Center,
  HStack,
  Avatar,
} from "native-base";
import StaffList from "../components/StaffList";

export default function History() {
  return (
    <Container>
      <Heading size="md" style={{ padding: 10 }}>
        Current Staff
      </Heading>
      <Center>
        <Card style={{ height: 150, width: 300, padding: 10, marginLeft: 40 }}>
          <HStack space={3} justifyContent="center" width="100%">
            <Avatar
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
              size="2xl"
            />
            <VStack>
              <Text style={{ fontSize: 20, margin: 5 }}>Sam Yuruk</Text>
              <Text style={{ margin: 5 }}>Head Nurse</Text>
            </VStack>
          </HStack>
        </Card>
      </Center>
      <Heading size="md" style={{ padding: 10 }}>
        Staff History
      </Heading>
      <StaffList />
    </Container>
  );
}
