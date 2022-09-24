import React, { useState } from "react";
import { List } from "react-native-paper";
import { Pressable, View, StyleSheet, Text } from "react-native";

function Expansion({ child, title }) {
  const [isExpanded, expand] = useState(false);
  async function show() {
    expand(!isExpanded);
  }
  return (
    <View>
      <List.Accordion
        title={title}
        left={(props) => (
          <List.Icon
            {...props}
            icon={isExpanded ? "chevron-right" : "chevron-down"}
          />
        )}
        right={(props) => null}
        expanded={isExpanded}
        onPress={show}
        style={styles.container}
      >
        {child()}
      </List.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
