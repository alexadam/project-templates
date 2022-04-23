
import React, { useState } from "react";
import { StyleSheet, FlatList } from 'react-native';
import ITodo from "../models/todo.model";
import Todo from "./todo";

interface ITodoListProps {
  data: ITodo[]
}

const TodoList = (props: ITodoListProps) => {
  const [isDone, setDone] = useState(false);
  
  return (
    <FlatList 
        style={styles.container}
        data={props.data}
        renderItem={
          (item: any) => {
            return (
              <Todo data={item.item} />
            )
          }
        }
        keyExtractor={(item, index) => item.id}
      />
  );
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    // height: '100%', maxHeight: '100%',
    height: 500,
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    overflow: 'scroll',
  },
});