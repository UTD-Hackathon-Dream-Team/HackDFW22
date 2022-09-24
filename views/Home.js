import React, { useState, useEffect } from "react";
import { Container, Center, Text, FlatList, Checkbox } from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const [goals, setGoals] = useState({});

  useEffect(() => {
    // Update the document title using the browser API
    async function getGoals() {
      console.log(global.config.patientId);
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      const goalList = [
        { item: "Do something 1" },
        { item: "Do something 2" },
        { item: "Do something 3" },
      ];
      setGoals(goalList);

      const resourceList = [
        { item: "Resource 1" },
        { item: "Resource 2" },
        { item: "Resource 3" },
      ];
    }
    getGoals();
  }, []);

  return (
    <Center>
      <Container>
        <Text>Home</Text>
        <Text>Today's Goals</Text>
        <FlatList
          data={goals}
          renderItem={({ item }) => <Checkbox>{item.item}</Checkbox>}
        />
        <Text>Information</Text>
        {/* <FlatList
          data={resourceList}
          renderItem={({ item }) => <Text>{item.item}</Text>}
        /> */}
      </Container>
    </Center>
  );
}
