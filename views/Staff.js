import React from "react";
import { Text, View } from "react-native";
import { Avatar, FlatList } from "native-base";
import { Card } from "react-native-paper";

export default function Staff({ route }) {
  return (
    <View p="3" backgroundColor="#F5DCDA" style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        {route.params.name}
      </Text>
      <Avatar
        source={{
          uri: route.params.image,
        }}
        size="2xl"
        style={{ marginTop: 10, alignSelf: "center" }}
      />

      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        {route.params.job}
      </Text>

      {route.params.status ? (
        <Text
          style={{
            marginTop: 10,
            backgroundColor: "#A4E28D",
            alignSelf: "center",
            paddingHorizontal: 10,
          }}
        >
          Current
        </Text>
      ) : (
        null
      )}

      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        {route.params.funfact}
      </Text>
      <Text style={{ marginTop: 10 }}>Attending History</Text>

      <FlatList
        style={{ marginTop: 5 }}
        data={route.params.history}
        renderItem={({ item }) => (
          <Card>
            <Text>
              from {item.timein.seconds} to {item.timeout.seconds}
            </Text>
          </Card>
        )}
      />

      <Text style={{ marginTop: 10 }}>Procedures Performed</Text>
      <Card style={{ marginTop: 5 }}>
        <Card.Title title="Test Title" subtitle="Test Subtitle" />
      </Card>
    </View>
  );
}
