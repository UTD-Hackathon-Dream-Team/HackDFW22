import React from "react";
import { Text, View } from "react-native";
import { Avatar, FlatList, Heading } from "native-base";
import { Card } from "react-native-paper";

export default function Staff({ route }) {
  return (
    <View
      p="3"
      backgroundColor="#F5DCDA"
      style={{ flex: 1, padding: 20, paddingTop: 5 }}
    >
      <Heading my="2" textAlign="center">
        {route.params.name}
      </Heading>
      <Avatar
        source={{
          uri: route.params.image,
        }}
        size="2xl"
        style={{ alignSelf: "center" }}
      />

      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
          fontSize: 20,
        }}
      >
        Role: {route.params.job}
      </Text>

      {route.params.status ? (
        <Text
          style={{
            marginTop: 10,
            backgroundColor: "#A4E28D",
            alignSelf: "center",
            paddingHorizontal: 10,
            fontSize: 15,
          }}
        >
          Current
        </Text>
      ) : null}

      <Text
        style={{
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        Fun fact: {route.params.funfact}
      </Text>
      <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
        Attending History
      </Text>

      <FlatList
        style={{ margin: 5 }}
        data={route.params.history}
        renderItem={({ item }) => {
          return (
            <Card style={{ padding: 15, backgroundColor: "#dcc6c4" }}>
              <Text>from: {item.timein.toDate().toLocaleString()}</Text>
              <Text>to: {item.timeout.toDate().toLocaleString()}</Text>
            </Card>
          );
        }}
      />

      <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
        Procedures Performed
      </Text>
      <FlatList
        style={{ margin: 5 }}
        data={route.params.procedures}
        renderItem={({ item }) => {
          return (
            <Card style={{ padding: 15, backgroundColor: "#dcc6c4" }}>
              <Text>{item.time.toDate().toLocaleString()}</Text>
              <Text>{item.description}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
}
