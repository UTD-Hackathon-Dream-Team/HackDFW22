import React from "react";
import { Card } from "react-native-paper";
import { Avatar } from "native-base";
import { FlatList } from "react-native";

export default function StaffList({ history, procedures, navigation }) {
  const LeftContent = (pic) => (
    <Avatar
      source={{
        uri: pic,
      }}
    />
  );

  const renderItem = ({ item }) => (
    <Card
      style={{ marginBottom: 20, backgroundColor: "#dcc6c4" }}
      onPress={() => {
        navigation.push("Staff", {
          name: item.staff.name,
          job: item.staff.job,
          status: item.staff.onshift,
          funfact: item.staff.funfact,
          image: item.staff.image,
          procedures: procedures.filter(function (entry) {
            return entry.staffId == item.staffId;
          }),
          history: history.filter(function (entry) {
            return entry.staffId == item.staffId;
          }),
        });
      }}
    >
      <Card.Title
        title={item.staff.name}
        subtitle={item.timein.toDate().toLocaleString()}
        left={() => LeftContent(item.staff.image)}
      />
    </Card>
  );

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.staffId}
      style={{ width: "100%" }}
    />
  );
}
