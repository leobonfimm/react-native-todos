import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    const newTask:Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?', 
      [
        {
          style: 'cancel',
          text: 'Não'
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            setTasks(oldState => oldState.filter(task => task.id !== id));
          }
        }
      ]
    );
  }

  function handleEditTask(id: number, newTitleTask: string) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          title: newTitleTask,
          done: task.done,
        };
      }

      return task;
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})