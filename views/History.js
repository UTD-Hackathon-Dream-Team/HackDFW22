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
import { doc, getDoc } from "firebase/firestore";
import StaffList from "../components/StaffList";

export default function History({navigation}) {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    async function getHistory() {
      const docRef = doc(db, "patient", global.config.patientId);
      let docSnap = await getDoc(docRef);
      docSnap = docSnap.get("visits");
      for (let visit of docSnap) {
        const staff = await (
          await getDoc(doc(db, "staff", visit.staffId))
        ).data();
        visit.staff = staff;
      }
      setHistory(docSnap);
    }
    getHistory();
  }, []);

  return (
    <Container>
      <Heading size="md" style={{ padding: 10 }}>
        Current Staff
      </Heading>
      <Center>
        <Card style={{ height: 150, width: 300, padding: 10, marginLeft: 40 }}>
          <HStack space={3} justifyContent="center" width="100%">
            <Avatar
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
              size="2xl"
            />
            <VStack>
              <Text style={{ fontSize: 20, margin: 5 }}>Sam Yuruk</Text>
              <Text style={{ margin: 5 }}>Head Nurse</Text>
            </VStack>
          </HStack>
        </Card>
      </Center>
      <Heading size="md" style={{ padding: 10 }}>
        Staff History
      </Heading>
      {history ? <StaffList history={history} navigation={navigation}/> : <Spinner size="lg" />}
    </Container>
  );
}
