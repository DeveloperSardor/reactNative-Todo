import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

const Fallback = () => {
  return (
    <View style={{alignItems : 'center'}}>
      <Image
        source={require("../../assets/images/todo-img.jpg")}
        style={{ height: 200, width: 300 }}
      />
      <Text>Start adding your task</Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({});
