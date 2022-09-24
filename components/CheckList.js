import { Center, ScrollView, Text, View, Checkbox, VStack } from "native-base";

export default function CheckList({ tasks, setTasks }) {
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
    <Center>
      <ScrollView>
        {tasks.map((task, index) => {
          return (
            <VStack key={index}>
              <Checkbox
                isChecked={task.isCompleted}
                onPress={() => checkTask(index)}
                value={task.text}
              >
                {task.text}
              </Checkbox>
            </VStack>
          );
        })}
      </ScrollView>
    </Center>
  );
}
