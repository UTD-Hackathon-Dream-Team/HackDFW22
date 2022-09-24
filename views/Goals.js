import React, { useState, useEffect } from "react";
import { Container, Center } from "native-base";
import CheckList from "../components/CheckList";
import { StyleSheet, Text, View } from "react-native";
import Expansion from "../components/Expansion";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";
import { focusProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const Goals = () => {
  const [todays, setTodays] = useState([]);
  const [yesterdays, setYesterdays] = useState({});
  const [tomorrows, setTomorrows] = useState({});

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
      var today = new Date().toJSON().slice(0, 10);
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var patientGoals = await docSnap.data().goals;
        for (let index = 0; index < patientGoals.length; index++) {
          const obj = patientGoals[index];
          var goalDate = new Date(obj.date.seconds * 1000)
            .toJSON()
            .slice(0, 10);
          if (goalDate === today) {
            setTodays((todays) => [...todays, obj]);
          } else if (goalDate < today) {
            const less = yesterdays;
            if (!Object.keys(less).includes(goalDate)) {
              less[goalDate] = [];
            }
            less[goalDate] = [...less[goalDate], obj];
            setYesterdays(JSON.parse(JSON.stringify(less)));
          } else {
            const more = tomorrows;
            if (!Object.keys(more).includes(goalDate)) {
              more[goalDate] = [];
            }
            more[goalDate] = [...more[goalDate], obj];
            setTomorrows(JSON.parse(JSON.stringify(more)));
          }
        }
        console.log("State");
        console.log(todays);
        console.log(yesterdays);
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
        <CheckList goals={todays} setGoals={setTodays}></CheckList>
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
