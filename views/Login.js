import React from "react";
import { View, TextInput } from "react-native";
import { Button, Center, Container,Box, NativeBaseProvider, Text } from "native-base";
import Swiper from "react-native-swiper/src";
import { LinearGradient } from 'expo-linear-gradient';

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
  bg: {
    linearGradient: {
      colors: ["#f3f0e8", "#cfc3a6"],
      start: [0.5, 0.5],
      end: [1, 1],
    },
  },
};

export default function Home({ navigation }) {
  const [name, onChangeName] = React.useState(null);
  const [dob, onChangeDOB] = React.useState("");

  function login() {
    console.log(name, dob);
    // navigation.navigate("Root");
  }

  return (
    <Box bg={styles.bg} style={{ flex: 1 }}>
      <Swiper showsButtons loop={false}>
        <Box style={styles.slides}>
          {/* <Image source={} style={{ width: 180, height: 200 }}></Image> */}
          <Text m="7" fontSize="4xl" style={styles.desc}>
            welcome to our app :D
          </Text>
          <Button shadow={2} onPress={() => navigation.navigate("Root")}>
              Click me
              </Button>
        </Box>
        <Box style={styles.slides}>
          {/* <Image source={} style={{ width: 120, height: 120 }}></Image> */}
          <Text m="7" fontSize="3xl" style={styles.desc}>
            words words words
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
        </Box>
      </Swiper>
    </Box>
  );
}

