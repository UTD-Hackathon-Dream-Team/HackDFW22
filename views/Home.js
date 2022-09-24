import React from "react";
import { Container, Center, Text, FlatList, Checkbox } from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function Home() {
  const docRef = doc(db, "patient", global.config.patientID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  const goalList = [
    { item: "Do something 1" },
    { item: "Do something 2" },
    { item: "Do something 3" },
  ];

  const resourceList = [
    { item: "Resource 1" },
    { item: "Resource 2" },
    { item: "Resource 3" },
  ];

  return (
    <Center>
      <Container>
        <Text>Home</Text>
        <Text>Today's Goals</Text>
        {/* <FlatList
          data={goalList}
          renderItem={({ item }) => <Checkbox>{item.item}</Checkbox>}
        /> */}
        <Text>Information</Text>
        {/* <FlatList
          data={resourceList}
          renderItem={({ item }) => <Text>{item.item}</Text>}
        /> */}
      </Container>
    </Center>
  );
}
