import React from "react";
import { Button, Center, Container } from "native-base";
import { View, TextInput, Text } from "react-native";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../util/firebase";

export default function Home({ navigation }) {
  const [name, onChangeName] = React.useState(null);
  const [dob, onChangeDOB] = React.useState("");

  async function login() {
    console.log(name, dob);
    const patient = query(
      collection(db, "patient"),
      where("name", "==", name),
      where("dob", "==", dob)
    );
    const querySnapshot = await getDocs(patient);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    // navigation.navigate("Root");
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
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
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Date of Birth</Text>
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
  );
}
