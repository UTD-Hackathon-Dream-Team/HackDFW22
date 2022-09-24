import React, { useState, useEffect } from "react";
import { Container, Center, Text, FlatList, View } from "native-base";
import { Checkbox, ListItem, Body } from "react-native";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home() {
  const [goals, setGoals] = useState({});
  var today = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    async function getGoals() {
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

  async function completeGoal(goalID) {
    console.log("Updating", goalID);
    const docRef = doc(db, "patient", global.config.patientId);
    const docSnap = await getDoc(docRef);
    var oldGoals = await docSnap.data().goals;
    var objIndex = oldGoals.findIndex((obj) => obj.id == goalID);
    console.log(objIndex);
    console.log(oldGoals[objIndex]);
    oldGoals[objIndex].done = !oldGoals[objIndex].done;
    await updateDoc(docRef, {
      goals: oldGoals,
    });
    const results = oldGoals.filter((obj) => {
      var goalDate = new Date(obj.date.seconds * 1000).toJSON().slice(0, 10);
      return goalDate === today;
    });
    setGoals(results);
  }

  return (
    <Center>
      <Container>
        <Text>Home</Text>
        <Text>Today's Goals</Text>
        <FlatList
          data={goals}
          style={{ backgroundColor: "pink", height: 150, flexGrow: 0 }}
          renderItem={({ item }) => (
            <View>
              <Icon
                name={item.done ? "check-circle" : "radio-button-unchecked"}
                size={20}
                color="#666666"
                onPress={() => completeGoal(item.id)}
              />
              <Text>{item.goal}</Text>
            </View>
          )}
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
