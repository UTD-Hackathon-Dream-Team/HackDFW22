import React, { useState, useEffect } from "react";
import { Container, Center, Text, FlatList, View } from "native-base";
import { Linking } from "react-native";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import TodayGoals from "../components/TodayGoals";

export default function Home() {
  const [resources, setResources] = useState({});
  var today = new Date().toJSON().slice(0, 10);

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
    const resourceList = [
      { item: "Resource 1" },
      { item: "Resource 2" },
      { item: "Resource 3" },
    ];
    getResources();
  }, []);

  return (
    <Center>
      <Container>
        <Text>Home</Text>
        <Text>Today's Goals</Text>
        <TodayGoals />
        <Text>Information</Text>
        <FlatList
          style={{ backgroundColor: "pink", height: 250, flexGrow: 0 }}
          data={resources}
          renderItem={({ item }) => (
            <View>
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
    </Center>
  );
}
