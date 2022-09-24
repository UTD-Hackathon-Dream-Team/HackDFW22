import React, { useState, useEffect } from "react";
import { Text, FlatList, View } from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";

const TodayGoals = () => {
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
    }
    getGoals();
  }, []);

  async function completeGoal(goalID) {
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
    <FlatList p="5"
      data={goals}
      style={{ backgroundColor: "#dcc6c4", height: 150, flexGrow: 0 }}
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
  );
};

export default TodayGoals;
