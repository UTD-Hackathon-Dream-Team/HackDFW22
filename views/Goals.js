import React, { useState, useEffect } from "react";
import { Container, Center, Text } from "native-base";
import CheckList from "../components/CheckList";

export default function Goals() {
  let testlist = ["test", "test2"];
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(testlist.map((item) => ({ text: item, completed: false })));
  });
  return (
    <Center>
      <Container>
        <Text>Goals</Text>
        <CheckList tasks={tasks} setTasks={() => setTasks}></CheckList>
      </Container>
    </Center>
  );
}
