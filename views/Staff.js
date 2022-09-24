import React from "react";
import { Text, View } from "react-native";
import { Avatar, FlatList } from "native-base";
import { Card } from "react-native-paper";
import { Timestamp } from "firebase/firestore";

export default function Staff({ route }) {
  return (
    <View>
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
      ) : null}

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
        renderItem={({ item }) => {
          return (
            <Card>
              <Text>from: {item.timein.toDate().toString()}</Text>
              <Text>to: {item.timeout.toDate().toString()}</Text>
            </Card>
          );
        }}
      />

      <Text style={{ marginTop: 10 }}>Procedures Performed</Text>
      <FlatList
        style={{ marginTop: 5 }}
        data={route.params.procedures}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text>{item.time.toDate().toString()}</Text>
              <Text>{item.description}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
}
