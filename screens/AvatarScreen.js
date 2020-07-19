import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, } from "react-native";
import UserPermissions from "../utilities/UserPermissions";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


export default class AvatarScreen extends Component {

state = {
    user: {
        name:this.props.navigation.state.params.user.name,
        email:this.props.navigation.state.params.user.email,
        password:this.props.navigation.state.params.user.password,
        avatar: null
    },
    errorMessage: null
};
  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
    });

    if (!result.cancelled) {
        this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
};
  render() {
    console.log("name ",this.state.name)
    return (
      <View style={styles.container}>
      <View style={{ position: "absolute", top: 64, alignItems: "center", width: "100%" }}>
      
      <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
          <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
          <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 6, marginLeft: 2 }}
          ></Ionicons>
      </TouchableOpacity>

  </View>
  <View >
      <TouchableOpacity style={styles.button}
onPress={() => this.props.navigation.navigate("Question",{user: this.state.user})}>
    <Text style={{ color: "#FFF", fontWeight: "500" }}>Next</Text>
</TouchableOpacity>
</View>
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
  errorMessage: {
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30
  },
  error: {
      color: "#E9446A",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center"
  },

  avatarPlaceholder: {
      width: 100,
      height: 100,
      backgroundColor: "#E1E2E6",
      borderRadius: 50,
      marginTop: 48,
      justifyContent: "center",
      alignItems: "center"
  },
  avatar: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50
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
