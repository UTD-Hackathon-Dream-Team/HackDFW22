import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import {
  View,
  VStack,
  Heading,
  Text,
  Center,
  HStack,
  Avatar,
  Spinner,
} from "native-base";
import { db } from "../util/firebase";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import StaffList from "../components/StaffList";

export default function History({ navigation }) {
  const [history, setHistory] = useState(null);
  const [currentStaff, setCurrentStaff] = useState(null);

  useEffect(() => {
    async function getHistory() {
      const docRef = doc(db, "patient", global.config.patientId);
      let docSnap = await getDoc(docRef);
      await getCurrentStaff(docSnap.get("wing"));
      docSnap = docSnap.get("visits");
      for (let visit of docSnap) {
        const staff = await (
          await getDoc(doc(db, "staff", visit.staffId))
        ).data();
        visit.staff = staff;
      }
      setHistory(docSnap);
    }

    async function getCurrentStaff(patientWing) {
      const qry = await query(
        collection(db, "staff"),
        where("onshift", "==", true)
      );

      const querySnapshot = await getDocs(qry);
      // console.log(patientWing)

      querySnapshot.forEach((doc) => {
        if (patientWing == doc.data().wing) {
          setCurrentStaff(doc.data());
        }
      });
    }
    getHistory();
  }, []);

  return (
    <View p="3" backgroundColor="#F5DCDA" style={{ flex: 1 }}>
      <Heading my="2">Current Staff</Heading>
      <Center>
        {currentStaff ? (
          <Card
            style={{ height: 150, width: 300, padding: 10 }}
            onPress={() => {
              navigation.push("Staff", {
                name: currentStaff.name,
                job: currentStaff.job,
                status: currentStaff.onshift,
                funfact: currentStaff.funfact,
                image: currentStaff.image,
                history: history.filter(function (entry) {
                  return entry.staffId == currentStaff.staffId;
                }),
              });
            }}
          >
            <HStack space={3} justifyContent="center" width="100%">
              <Avatar
                source={{
                  uri: currentStaff.image,
                }}
                size="2xl"
              />
              <VStack>
                <Text style={{ fontSize: 20, margin: 5 }}>
                  {currentStaff.name}
                </Text>
                <Text style={{ margin: 5 }}>{currentStaff.job}</Text>
              </VStack>
            </HStack>
          </Card>
        ) : (
          <Spinner size="lg" />
        )}
      </Center>
      <Heading my="2">Staff History</Heading>
      {history ? (
        <StaffList history={history} navigation={navigation} />
      ) : (
        <Spinner size="lg" />
      )}
    </View>
  );
}
