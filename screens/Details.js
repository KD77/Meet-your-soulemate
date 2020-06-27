import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Button, ImageBackground,ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import styles from '../assets/styles/index';



export default class Details extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Details',
      headerRight: <Button
                       title="Log out"
                      
                       onPress={() => {
                         Fire.shared.signOut();
                       }}
                       color="rgba(0,122,255,1)"
                        />
  
    };
  };

  state={
name:this.props.navigation.state.params.id.name,
id:this.props.navigation.state.params.id.key
  };
  continue = () => {
    this.props.navigation.navigate("Message", { name: this.state.name,
      id:this.state.id
     });
  };
  render() {
   
    return (
      <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={
          this.props.navigation.state.params.id.avatar
            ? { uri: this.props.navigation.state.params.id.avatar }: require("../assets/tempAvatar.jpg") }style={styles.photo}>
          <View style={styles.top}>
            

            
          </View>
        </ImageBackground>
     
       
       
        <View style={styles.containerProfileItem}>
        
       
         <Text style={styles.name}>{this.state.name}</Text>

      <Text style={styles.descriptionProfileItem}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      </Text>
    
           
          </View>
      
        <View style={styles.actionsProfile}>
     
         

        <TouchableOpacity style={styles.roundedButton}
        onPress={this.continue}>
     
          <Text style={styles.iconButton}>
         <AntDesign name="message1" size={24} color="black" />
          </Text>
        
          <Text style={styles.textButton}>Start chatting</Text>
        </TouchableOpacity>
      </View>

      
      </ScrollView>
      </ImageBackground>
    
    )
  }
}
