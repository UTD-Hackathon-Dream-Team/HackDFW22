import React from "react";
import { ImageBackground } from "react-native";
import { Center, Text, View, Button } from "native-base";
import { Card } from "react-native-paper";

export default function Story2({ route, navigation }) {
  return (
    <ImageBackground
      source={require("../assets/rabbit-bkg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, alignItems: "center", top: 150 }}>
        <Text
          style={{ padding: 20, fontWeight: "bold" }}
          onPress={() => navigation.replace("Root")}
        >
          The flu is caused by the influenza virus. A virus is a microorganism,
          which means it's so small that you would need a strong microscope to
          see it.
        </Text>
      </View>
      {/* <Button onPress={() = {navigation.push("")}}> Next </Button> */}
    </ImageBackground>
  );
}
