import React, { Component } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity,TextInput } from "react-native";
import Fire from "../Fire";

export default class EditUser extends Component {
  state = {
    text: "",
   
};
 


handleSubmit=()=>{
  const userId= Fire.shared.uid;
Fire.shared.firestore.collection("users")
 .doc(userId)
 .update({
  bio: this.state.text,
     
  
   });

}

  render() {
    return (
      <View style={styles.container}>
      <Text>Bio </Text>
      <View style={styles.inputContainer}>
      
      <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Want to share something?"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
      ></TextInput>
  </View>
  <TouchableOpacity
  onPress={this.handleSubmit}
  >
  <Text>save</Text>
  </TouchableOpacity>
     
      </View>
    
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
    borderColor:"#000",
    borderWidth: 1,
    width: '80%',
    height:80
}
});