import React, { useState, useEffect } from "react";
import DayGoals from "../components/DayGoals";
import { StyleSheet } from "react-native";
import { Heading, View } from "native-base";
import Expansion from "../components/Expansion";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";

const Goals = () => {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  today = today.toJSON().slice(0, 10);
  const [yesterdays, setYesterdays] = useState([]);
  const [tomorrows, setTomorrows] = useState([]);

  useEffect(() => {
    async function getGoals() {
      const docRef = doc(db, "patient", global.config.patientId);
      let futures = new Set();
      let past = new Set();
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var patientGoals = await docSnap.data().goals;
        for (let index = 0; index < patientGoals.length; index++) {
          const obj = patientGoals[index];
          var goalDate = new Date(obj.date.seconds * 1000);
          goalDate.setHours(0, 0, 0, 0);
          goalDate = goalDate.toJSON().slice(0, 10);
          if (goalDate.valueOf() < today.valueOf()) {
            past.add(goalDate);
          } else if (goalDate.valueOf() > today.valueOf()) {
            futures.add(goalDate);
          }
        }
        setTomorrows([...futures]);
        setYesterdays([...past]);
      } else {
        console.log("No such document!");
      }
    }
    getGoals();
  }, []);

  return (
    <View p="3" backgroundColor="#F5DCDA" style={{ flex: 1 }}>
      <View style={styles.container}>
        <Heading my="2">Today</Heading>
        <DayGoals today={today}></DayGoals>
      </View>
      <View style={styles.container}>
        <Heading my="2">Upcoming Goals</Heading>
        {tomorrows.map((key, i) => (
          <Expansion
            key={key}
            title={key}
            child={() => <DayGoals today={key}></DayGoals>}
          ></Expansion>
        ))}
      </View>
      <View style={styles.container}>
        <Heading my="2">Past Goals</Heading>
        {yesterdays.map((key, i) => (
          <Expansion
            key={key}
            title={key}
            child={() => <DayGoals today={key}></DayGoals>}
          ></Expansion>
        ))}
      </View>
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
