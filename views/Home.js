import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Heading, Badge, Flex } from "native-base";
import { Linking } from "react-native";
import { db } from "../util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { Text } from "react-native-paper";
import DayGoals from "../components/DayGoals";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  const [resources, setResources] = useState({});

  useEffect(() => {
    async function getResources() {
      const docRef = doc(db, "patient", global.config.patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var results = await docSnap.data().information;
        // console.log(results);
        setResources(results);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getResources();
  }, []);

  return (
    <View p="3" backgroundColor="#F5DCDA" style={{ flex: 1 }}>
      <Heading my="2">Today's Goals</Heading>
      <DayGoals today={new Date().toJSON().slice(0, 10)} />
      <Heading my="3">Information</Heading>

      <FlatList
        p="5"
        style={{
          backgroundColor: "#dcc6c4",
          height: 200,
          width: 275,
          flexGrow: 0,
        }}
        data={resources}
        renderItem={({ item }) => (
          <View>
            <Flex direction="row">
              {!item.watched && <Badge colorScheme="success">NEW</Badge>}
              <Text
                style={{ margin: 10, textDecorationLine: "underline" }}
                onPress={() => {
                  if (item.link) {
                    Linking.canOpenURL(item.link).then((supported) => {
                      if (supported) {
                        Linking.openURL(item.link);
                      } else {
                        console.log("Don't know how to open URI: " + item.link);
                      }
                    });
                  } else {
                    navigation.push("What is flu?");
                  }
                }}
              >
                {item.title}
              </Text>
            </Flex>
          </View>
        )}
      />
    </View>
  );
}
