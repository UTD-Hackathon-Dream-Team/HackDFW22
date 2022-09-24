import React, { useState, useEffect } from "react";
import DayGoals from "../components/DayGoals";
import { StyleSheet, Text, View } from "react-native";
import Expansion from "../components/Expansion";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";

const Goals = () => {
  var today = new Date().toJSON().slice(0, 10);
  const [yesterdays, setYesterdays] = useState([]);
  const [tomorrows, setTomorrows] = useState([]);

  useEffect(() => {
    async function getGoals() {
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var patientGoals = await docSnap.data().goals;
        for (let index = 0; index < patientGoals.length; index++) {
          const obj = patientGoals[index];
          var goalDate = new Date(obj.date.seconds * 1000)
            .toJSON()
            .slice(0, 10);
          if (goalDate < today) {
            setYesterdays([...new Set([...yesterdays, goalDate])]);
          } else if (goalDate > today) {
            setTomorrows([...new Set([...tomorrows, goalDate])]);
          }
        }
        console.log("Tomorrows");
        console.log(tomorrows);
      } else {
        console.log("No such document!");
      }
    }
    getGoals();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Today</Text>
        <DayGoals today={today}></DayGoals>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Goals</Text>
        {tomorrows.map((key, i) => (
          <Expansion
            key={key}
            title={key}
            child={() => <DayGoals today={key}></DayGoals>}
          ></Expansion>
        ))}
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Past Goals</Text>
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
