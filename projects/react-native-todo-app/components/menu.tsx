
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';

interface IMenu {
  onAddTodo: () => void
}

const Menu = (props: IMenu) => {  
  return (
    <View style={styles.container}>
      <Button 
        title="+ Add ToDo" 
        onPress={() => props.onAddTodo()}/>
    </View>
  );
}

export default Menu

const styles = StyleSheet.create({
  container: {
    width: '100%', minHeight: 30, height: 'auto',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
});