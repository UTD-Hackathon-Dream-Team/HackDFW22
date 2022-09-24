import { Center, Container, ScrollView, Checkbox, VStack } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const CheckList = ({ tasks, setTasks }) => {
  const checkTask = (index) => {
    console.log(index);
    let newtasks = tasks;
    for (let i = 0; i < newtasks.length; i++) {
      if (i == index) {
        newtasks[i].completed = !newtasks[i].completed;
      }
    }
    console.log(index);
    setTasks(newtasks);
  };

  return (
    <ScrollView>
      {tasks.map((task, index) => {
        return (
          <VStack key={index}>
            <Text>{task.text}</Text>
          </VStack>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

export default CheckList;
