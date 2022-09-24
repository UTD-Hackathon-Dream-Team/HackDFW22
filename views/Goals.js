import React, { useState, useEffect } from "react";
import { Container, Center } from "native-base";
import CheckList from "../components/CheckList";
import { StyleSheet, Text, View } from "react-native";

const Goals = () => {
  let testlist = ["test", "test2"];
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(testlist.map((item) => ({ text: item, completed: false })));
  });
  return (
    <View>
      <Container style={styles.container}>
        <Text style={styles.title}>Today</Text>
        <CheckList tasks={tasks} setTasks={() => setTasks}></CheckList>
      </Container>
      <Container style={styles.container}>
        <Text style={styles.title}>Upcoming Goals</Text>
        <CheckList tasks={tasks} setTasks={() => setTasks}></CheckList>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
  },
});

export default Goals;
