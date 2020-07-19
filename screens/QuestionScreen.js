import React, { Component } from 'react'
import { View, Text, StyleSheet, Image,FlatList,SafeAreaView,TouchableOpacity,TextInput } from "react-native";
import Fire from "../Fire";

export default class QuestionScreen extends Component {
  state = {
    user: {
      question:"",
      name:this.props.navigation.state.params.user.name,
      email:this.props.navigation.state.params.user.email,
      password:this.props.navigation.state.params.user.password,
      avatar:this.props.navigation.state.params.user.avatar, 
    },
    errorMessage: null
};
handleSignUp = () => {
  if (this.state.user.question.trim()!=="2"){
    
   alert("Sorry you didn't answer the Question");
  }else{
    Fire.shared.createUser(this.state.user);
   
  }
  
};
  render() {
    return (
      <View style={styles.container}>
      <Text> How many Raka is Fajar prayer</Text>
      <TextInput
      style={styles.input}
      onChangeText={question => this.setState({ user: { ...this.state.user, question } })}
      value={this.state.user.question}
  ></TextInput>
  <TouchableOpacity
  style={{ alignSelf: "center", marginTop: 32 }}
  onPress={this.handleSignUp}
>
  <Text style={{ fontWeight: "500", color: "#E9446A" }}> Sign up</Text>
  
</TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
input: {
  borderBottomColor: "#8A8F9E",
  borderBottomWidth: StyleSheet.hairlineWidth,
  height: 40,
  fontSize: 15,
  color: "#161F3D"
},
button: {
  marginHorizontal: 30,
  backgroundColor: "#E9446A",
  borderRadius: 4,
  height: 52,
  alignItems: "center",
  justifyContent: "center"
},
});

