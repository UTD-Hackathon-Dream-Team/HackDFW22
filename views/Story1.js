import React from "react";
import { ImageBackground } from "react-native";
import { Center, Text, View, Button } from "native-base";
import { Card } from "react-native-paper";

export default function Story1({ route, navigation }) {
  return (
    <ImageBackground
      source={require("../assets/rabbit-bkg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, alignItems: "center", top: 150 }}>
        <Text
          style={{ padding: 20, fontWeight: "bold" }}
          onPress={() => navigation.push("What is virus?")}
        >
          Flu is an infection that causes a fever, chills, cough, body aches,
          headaches, and sometimes earaches or sinus problems. It also sometimes
          cause nausea, vomiting, or diarrhea.
        </Text>
      </View>
      {/* <Button onPress={() = {navigation.push("")}}> Next </Button> */}
    </ImageBackground>
  );
}
