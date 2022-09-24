import React, { useState, useEffect } from "react";
import { Container, Center, Text, FlatList, View, Heading } from "native-base";
import { Linking } from "react-native";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { Text } from "react-native-paper";
import TodayGoals from "../components/TodayGoals";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const [resources, setResources] = useState({});

  useEffect(() => {
    async function getResources() {
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var results = await docSnap.data().information;
        console.log(results);
        setResources(results);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getResources();
  }, []);

  return (
    <Container p="3" backgroundColor="#F5DCDA" style={{ flex: 1 }}>
      <Heading my="2">Today's Goals</Heading>
      <TodayGoals />
      <Heading my="2">Information</Heading>
      <FlatList
        style={{ backgroundColor: "pink", height: 250, flexGrow: 0 }}
        data={resources}
        renderItem={({ item }) => (
          <View>
            {!item.watched && <Text style={{ color: "red" }}>NEW</Text>}
            <Text
              style={{ margin: 10, textDecorationLine: "underline" }}
              onPress={() => {
                item.link != null &&
                  Linking.canOpenURL(item.link).then((supported) => {
                    if (supported) {
                      Linking.openURL(item.link);
                    } else {
                      console.log("Don't know how to open URI: " + item.link);
                    }
                  });
              }}
            >
              {item.title}
            </Text>
          </View>
        )}
      />
    </Container>
  );
}
