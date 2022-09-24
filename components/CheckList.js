import React, { useState, useEffect } from "react";

import { Center, ScrollView, Text, View, Checkbox } from "native-base";

export default function CheckList({ itemslist }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(itemslist.map((item) => ({ text: item, completed: false })));
  });

  const checkTask = (index) => {
    console.log(index);
    let newtasks = tasks;
    for (let i = 0; i < newtasks.length; i++) {
      if (i == index) {
        newtasks[i].completed = !newtasks[i].completed;
      }
    }
    setTasks(newtasks);
  };

  return (
    <Center>
      <ScrollView>
        {tasks.map((task, index) => {
          return (
            <View key={index}>
              <Checkbox
                isChecked={task.isCompleted}
                onPress={() => checkTask(index)}
                value={task.text}
              >
                {task.text}
              </Checkbox>
            </View>
          );
        })}
      </ScrollView>
    </Center>
  );
}
