import React, { useState } from "react";
import { List } from "react-native-paper";
import { Pressable, View, SafeAreaView, StyleSheet, Text } from "react-native";
import { Button } from "native-base";

function Expansion({ child, title }) {
  const [isExpanded, expand] = useState(false);
  async function show() {
    console.log("hello");
    expand(!isExpanded);
  }
  return (
    <View style={styles.container}>
      {/* <Button onPress={show} title={title} /> */}
      <Pressable onPress={show} style={styles.button}>
        <Text>{title}</Text>
      </Pressable>
      <View>{isExpanded && child()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    marginBottom: 30,
    height: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
});

export default Expansion;
