import React from "react";
import { Text, View } from "react-native";
import { Avatar, FlatList } from "native-base";
import { Card } from "react-native-paper";

export default function Staff({ route }) {
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
        <FlatList 
            data= {route.params.history} 
            renderItem={({ item }) => (
                <View>
                    <Text>Time in: {item.timein.seconds}</Text>
                    <Text>Time out: {item.timeout.seconds}</Text>
                </View>
            )}/>
      </Card>
      <Text>Procedures Performed</Text>
      <Card>
        <Card.Title title="Test Title" subtitle="Test Subtitle" />
      </Card>
    </View>
  );
}
