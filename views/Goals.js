import React, { useState, useEffect } from "react";
import { Container, Center } from "native-base";
import CheckList from "../components/CheckList";
import { StyleSheet, Text, View } from "react-native";
import Expansion from "../components/Expansion";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";
import { focusProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const Goals = () => {
  const [goals, setGoals] = useState({});
  const [todays, setTodays] = useState([]);
  const [yesterdays, setYesterdays] = useState([]);
  const [tomorrows, setTomorrows] = useState([]);

  useEffect(() => {
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    function lessthan(Date1, Date2) {
      return new Date(Date1).getTime() < new Date(Date2).getTime();
    }
    async function getGoals() {
      const allGoals = {};
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var patientGoals = await docSnap.data().goals;
        for (let index = 0; index < patientGoals.length; index++) {
          const obj = patientGoals[index];
          var goalDate = new Date(obj.date.seconds * 1000)
            .toJSON()
            .slice(0, 10);
          if (!Object.keys(patientGoals).includes(goalDate)) {
            allGoals[goalDate] = [];
          }
          allGoals[goalDate] = [...allGoals[goalDate], obj];
        }
        const dates_less_than = Object.keys(allGoals).filter((key) =>
          lessthan(Date.parse(key), new Date())
        );
        const dates_greater_than = Object.keys(allGoals).filter((key) =>
          lessthan(new Date(), Date.parse(key))
        );
        console.log("Keys");
        console.log(Object.keys(allGoals));
        console.log(dates_less_than);
        console.log(dates_greater_than);
        setTodays(allGoals[formatDate(new Date())]);
        setTomorrows();
        setYesterdays();
        setGoals(allGoals);
        // console.log(allGoals);
        console.log(yesterdays);
        console.log(todays);
        console.log(tomorrows);
        // console.log(dates);
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
        <Text>where today's will go</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Goals</Text>
        {/* <Expansion
            title="Expansion Title"
            child={() => (
              <CheckList tasks={tasks} setTasks={() => setTasks}></CheckList>
            )}
          ></Expansion> */}
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
