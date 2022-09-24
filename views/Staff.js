import React from "react";
import { Text, View, Image } from "react-native";
import { Avatar, usePropsResolution } from "native-base";
import { Card } from "react-native-paper";

export default function Staff({ route }) {
console.log(route.params);
  return (
    <View>
      <Text>{route.params.name}</Text>
      <Avatar
        source={{
          uri: route.params.image,
        }}
        size="2xl"
      />
      <Text>{route.params.job}</Text>
      <Text>{route.params.status.toString()}</Text>
      <Text>{route.params.funfact}</Text>
      <Text>Attending History</Text>
      <Card>
        <Card.Title title="Test Title" subtitle={route.params.time} />
      </Card>
      <Text>Procedures Performed</Text>
      <Card>
        <Card.Title title="Test Title" subtitle="Test Subtitle" />
      </Card>
    </View>
  );
}
