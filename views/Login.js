import React from "react";
import { View, TextInput } from "react-native";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../util/firebase";
import {
  Button,
  Center,
  Container,
  Box,
  NativeBaseProvider,
  Text,
} from "native-base";
import Swiper from "react-native-swiper/src";

var styles = {
  slides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    textAlign: "center",
    fontWeight: "bold",
  },
  
};

export default function Home({ navigation }) {
  const [name, onChangeName] = React.useState(null);
  const [dob, onChangeDOB] = React.useState("");

  async function login() {
    // console.log(name, dob);
    const patient = query(
      collection(db, "patient"),
      where("name", "==", name),
      where("dob", "==", dob)
    );
    const querySnapshot = await getDocs(patient);
    querySnapshot.forEach((doc) => {
      global.config.patientId = doc.id;
    });
    navigation.navigate("Root");
  }

  return (
    <NativeBaseProvider>
      <Box backgroundColor="#F5DCDA" style={{ flex: 1 }}>
        <Swiper showsButtons loop={false}>
          <Box style={styles.slides}>
            {/* <Image source={} style={{ width: 180, height: 200 }}></Image> */}
            <Text m="7" fontSize="4xl" style={styles.desc}>
              Welcome to Care Companion!
            </Text>
            {/* <Button shadow={2} onPress={() => navigation.navigate("Root")}>
              lemme in
            </Button> */}
          </Box>
          <Box style={styles.slides}>
            {/* <Image source={} style={{ width: 120, height: 120 }}></Image> */}
            <Text m="7" fontSize="3xl" style={styles.desc}>
              Keep track of your care milestones and the staff that assist you!
            </Text>
          </Box>
          <Box style={styles.slides}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Container>
                <Text my="3" fontSize="3xl" style={styles.desc}>
                  Login
                </Text>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Name</Text>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    width: 200,
                    marginBottom: 10,
                  }}
                  onChangeText={onChangeName}
                  value={name}
                />
                <Text style={{ fontSize: 20, marginBottom: 10 }}>
                  Date of Birth
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    width: 200,
                    marginBottom: 10,
                  }}
                  onChangeText={onChangeDOB}
                  value={dob}
                  placeholder="MMDDYYYY"
                  placeholderTextColor="grey"
                />
                <Button shadow={2} onPress={login}>
                  Log In
                </Button>
              </Container>
            </View>
          </Box>
        </Swiper>
      </Box>
    </NativeBaseProvider>
  );
}
