import React, { useState, useEffect } from "react";
import { Container, Center, Text, FlatList, Checkbox } from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const [goals, setGoals] = useState({});

  useEffect(() => {
    async function getGoals() {
      var today = new Date().toJSON().slice(0, 10);
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var patientGoals = await docSnap.data().goals;
        const results = patientGoals.filter((obj) => {
          var goalDate = new Date(obj.date.seconds * 1000)
            .toJSON()
            .slice(0, 10);
          return goalDate === today;
        });
        console.log(results);
        setGoals(results);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // const goalList = [
      //   { item: "Do something 1" },
      //   { item: "Do something 2" },
      //   { item: "Do something 3" },
      // ];

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
          style={{ backgroundColor: "pink", height: 150, flexGrow: 0 }}
          renderItem={({ item }) => <Checkbox>{item.goal}</Checkbox>}
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
