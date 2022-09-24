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
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import StaffList from "../components/StaffList";

export default function History({navigation}) {
  const [history, setHistory] = useState(null);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [patientWing, setPatientWing] = useState("");


  useEffect(() => {
    async function getHistory() {
      const docRef = doc(db, "patient", global.config.patientId);
      let docSnap = await getDoc(docRef);
      setPatientWing(docSnap.get("wing"));
      docSnap = docSnap.get("visits");
      for (let visit of docSnap) {
        const staff = await (
          await getDoc(doc(db, "staff", visit.staffId))
        ).data();
        visit.staff = staff;
      }
      setHistory(docSnap);
    }

    async function getCurrentStaff() {
      console.log("*******START**********")
      const qry = query(collection(db, "staff"), where("onshift", "==", true));
      
      const querySnapshot = await getDocs(qry);

      
      
      querySnapshot.forEach((doc) => {

        if(patientWing == doc.data().wing){
          setCurrentStaff(doc.data())
        }
      });
      console.log("*******END**********")
      console.log(history);
    }
    getHistory();
    getCurrentStaff();
    
  }, []);

 

  return (
    <Container>
      <Heading size="md" style={{ padding: 10 }}>
        Current Staff
      </Heading>
      <Center>
        <Card 
          style={{ height: 150, width: 300, padding: 10, marginLeft: 40 }}
          onPress={() => {
            navigation.push("Staff", { 
              name: currentStaff.name, 
              job: currentStaff.job,
              status: currentStaff.onshift, 
              funfact: currentStaff.funfact, 
              image: currentStaff.image,   
              history: history.filter(function (entry) {
                return entry.staffId == currentStaff.staffId;
             })
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
              <Text style={{ fontSize: 20, margin: 5 }}>{currentStaff.name}</Text>
              <Text style={{ margin: 5 }}>{currentStaff.job}</Text>
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
