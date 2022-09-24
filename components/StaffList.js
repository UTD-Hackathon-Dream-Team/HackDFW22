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
    <Card
      style={{ marginBottom: 20 }}
      onPress={() => {
        console.log(item.staff);
        navigation.push("Staff", { 
          name: item.staff.name, 
          job: item.staff.job,
          status: item.staff.onshift, 
          funfact: item.staff.funfact, 
          image: item.staff.image, 
          time: item.timein.seconds,  
          });
      }}
    >
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
