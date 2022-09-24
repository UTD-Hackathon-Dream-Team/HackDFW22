import React from "react";
import { Card } from "react-native-paper";
import { Avatar } from "native-base";
import { FlatList } from "react-native";

export default function StaffList({ history, navigation }) {
  const LeftContent = (pic) => (
    <Avatar
      source={{
        uri: pic,
      }}
    />
  );

  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 20 }} onPress={() => {
      console.log(navigation)
        navigation.push("Staff");
    }}>
      <Card.Title
        title={item.staff.name}
        subtitle={item.timein.seconds}
        left={() => LeftContent(item.staff.image)}
      />
    </Card>
  );

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.staffId}
      style={{ width: "100%", marginLeft: 30 }}
    />
  );
}
