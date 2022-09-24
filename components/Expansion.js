import React, { useState } from "react";
import { List } from "react-native-paper";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { ChevronRightIcon, ChevronDownIcon } from "native-base";

function Expansion({ child, title }) {
  const [isExpanded, expand] = useState(false);
  async function show() {
    expand(!isExpanded);
  }

  return (
    <View>
      <List.Accordion
        title={title}
        left={
          isExpanded
            ? (props) => <ChevronRightIcon />
            : (props) => <ChevronDownIcon />
        }
        right={(props) => null}
        expanded={isExpanded}
        onPress={show}
        style={styles.container}
        titleStyle={{
          color: "black",
        }}
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
    backgroundColor: "#F5DCDA",
    padding: 10,
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
