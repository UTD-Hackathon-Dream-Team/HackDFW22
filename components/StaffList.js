import React from "react";
import { Card } from "react-native-paper";
import { Avatar, Text, Center } from "native-base";
import { FlatList } from "react-native";

const data = [
  {
    staffId: 2,
    staffName: "Sam Yuruk",
    date: "10/20 10:00am-12:30pm",
    staffPic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    staffId: 1,
    staffName: "Sarah Smith",
    date: "10/19 10:00am-12:30pm",
    staffPic:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

export default function StaffList() {
  const LeftContent = (pic) => (
    <Avatar
      source={{
        uri: pic,
      }}
    />
  );

  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 20 }}>
      <Card.Title
        title={item.staffName}
        subtitle={item.date}
        left={() => LeftContent(item.staffPic)}
      />
    </Card>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.staffId}
      style={{ width: "100%", marginLeft: 30 }}
    />
  );
}
