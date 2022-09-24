import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import {
  Container,
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
  const [procedures, setProcedures] = useState(null);

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
    async function getProcedures() {
      const docRef = doc(db, "patient", global.config.patientId);
      let docSnap = await getDoc(docRef);
      docSnap = docSnap.get("procedure");

      setProcedures(docSnap);
    }

    async function getCurrentStaff(patientWing) {
      const qry = await query(
        collection(db, "staff"),
        where("onshift", "==", true)
      );

      const querySnapshot = await getDocs(qry);
      console.log(patientWing);

      querySnapshot.forEach((doc) => {
        if (patientWing == doc.data().wing) {
          setCurrentStaff(doc.data());
        }
      });
    }
    getHistory();
    getProcedures();
  }, []);

  return (
    <Container>
      <Heading size="md" style={{ padding: 10 }}>
        Current Staff
      </Heading>
      <Center>
        {currentStaff ? (
          <Card
            style={{ height: 150, width: 300, padding: 10, marginLeft: 40 }}
            onPress={() => {
              navigation.push("Staff", {
                name: currentStaff.name,
                job: currentStaff.job,
                status: currentStaff.onshift,
                funfact: currentStaff.funfact,
                image: currentStaff.image,
                procedures: procedures.filter(function (entry) {
                  return entry.staffId == currentStaff.staffId;
                }),
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
      <Heading size="md" style={{ padding: 10 }}>
        Staff History
      </Heading>
      {history ? (
        <StaffList
          procedures={procedures}
          history={history}
          navigation={navigation}
        />
      ) : (
        <Spinner size="lg" />
      )}
    </Container>
  );
}
