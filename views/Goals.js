import React, { useState, useEffect } from "react";
import { Container, Center } from "native-base";
import CheckList from "../components/CheckList";
import { StyleSheet, Text, View } from "react-native";
import Expansion from "../components/Expansion";
import { db } from "../util/firebase";
import { doc, getDoc } from "firebase/firestore";

const Goals = () => {
  const [goals, setGoals] = useState({});
  const [dates, setDates] = useState([]);

  useEffect(() => {
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
        setGoals(allGoals);
        setDates(Object.keys(allGoals));
        console.log(allGoals);
        console.log(dates);
      } else {
        console.log("No such document!");
      }
    }
    getGoals();
  }, []);

  return (
    <View>
      {dates.map((date, index) => {
        return (
          <View>
            <Text key={date + index}>{date}</Text>
            {goals[date].map((task, task_index) => (
              <Text key={task.id + date}>{task.goal}</Text>
            ))}
          </View>
        );
      })}
      {/* <View style={styles.container}>
          <Text style={styles.title}>Today</Text>
          <CheckList tasks={goals} setTasks={() => setTasks}></CheckList>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Upcoming Goals</Text>
          <CheckList tasks={tasks} setTasks={() => setTasks}></CheckList>
          <Expansion
            title="Expansion Title"
            child={() => (
              <CheckList tasks={tasks} setTasks={() => setTasks}></CheckList>
            )}
          ></Expansion>
        </View> */}
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
