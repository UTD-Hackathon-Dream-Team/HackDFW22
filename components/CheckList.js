import React, { useState, useEffect } from "react";
import { Text, FlatList, View } from "native-base";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";

const CheckList = ({ goals, setGoals }) => {
  var today = new Date().toJSON().slice(0, 10);

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
  );
};

export default CheckList;
