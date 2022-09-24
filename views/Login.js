import React from "react";
import { View, Button, Center, Container,Box, NativeBaseProvider, Text } from "native-base";
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
          {/* <Image source={} style={{ width: 120, height: 120 }}></Image> */}
          <Text m="7" fontSize="3xl" style={styles.desc}>
            salonis login stuffs here ^_^
          </Text>
        </Box>
      </Swiper>
    </Box>
  );
}

