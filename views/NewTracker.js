import React from "react";
import { Text, Center, Heading, Image, Button, TextArea } from "native-base";

export default function NewTracker({ navigation }) {
  return (
    <Center
      flex={1}
      style={{ justifyContent: "top", backgroundColor: "#F5DCDA" }}
    >
      <Heading my="3">Symptoms Tracking</Heading>
      <Text
        style={{ marginBottom: 10, paddingHorizontal: 10, textAlign: "center" }}
      >
        Color in where you feel any pain. Your doctor may leave notes after
        reviewing this.
      </Text>
      <Image
        alt="Human body"
        source={require("./body.png")}
        size="2xl"
        style={{ marginBottom: 20 }}
      />
      <TextArea
        placeholder="Enter any additional details"
        h={20}
        maxW="80"
        backgroundColor="#fff"
      />
      <Button style={{ marginTop: 25 }} onPress={() => navigation.pop()}>
        Submit
      </Button>
    </Center>
  );
}
