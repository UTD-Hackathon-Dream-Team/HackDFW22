import React, { useState, useEffect } from "react";
import { Container, Center, Text } from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import TodayGoals from "../components/TodayGoals";

export default function Home() {
  const [goals, setGoals] = useState({});
  var today = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    async function getResources() {
      const resourceList = [
        { item: "Resource 1" },
        { item: "Resource 2" },
        { item: "Resource 3" },
      ];
    }
    getResources();
  }, []);

  return (
    <Center>
      <Container>
        <Text>Home</Text>
        <Text>Today's Goals</Text>
        <TodayGoals />
        <Text>Information</Text>
        {/* <FlatList
          data={resourceList}
          renderItem={({ item }) => <Text>{item.item}</Text>}
        /> */}
      </Container>
    </Center>
  );
}
