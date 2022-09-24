import React, { useState, useEffect } from "react";
import { Heading,Container,View,Box} from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { Text } from "react-native-paper";
import TodayGoals from "../components/TodayGoals";
import { LinearGradient } from 'expo-linear-gradient';

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
      <Container p="3" backgroundColor="#F5DCDA" style={{ flex: 1}}>
        <Heading my="2">Today's Goals</Heading>
        <TodayGoals/>
        <Heading my="2">Information</Heading>
        {/* <FlatList
          data={resourceList}
          renderItem={({ item }) => <Text>{item.item}</Text>}
        /> */}
      </Container>
     
      );
}