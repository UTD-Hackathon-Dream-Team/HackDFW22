import { Center, Container, ScrollView, Checkbox, VStack } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const CheckList = ({ tasks, setTasks }) => {
  async function checkTask(index) {
    let newtasks = tasks;
    for (let i = 0; i < newtasks.length; i++) {
      if (i == index) {
        newtasks[i].completed = !newtasks[i].completed;
      }
    }
    setTasks(newtasks);
  }

  return (
    <ScrollView>
      {tasks.map((task, index) => {
        return (
          <Checkbox
            key={index + task.text}
            onPress={checkTask}
            checked={task.completed}
          >
            {task.text}
          </Checkbox>
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
