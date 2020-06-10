import React, { Component } from 'react'
import { Text, View,Image,TouchableOpacity,Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';



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
   
      <View style={{ flexDirection:"column",justifyContent:"center",alignItems: "center", marginTop:10}}>
       
       
        <Image
        source={
          this.props.navigation.state.params.id.avatar
            ? { uri: this.props.navigation.state.params.id.avatar }: require("../assets/tempAvatar.jpg") }
        style={{height:250,width:"100%", resizeMode: "cover"}}/> 
        <Text style={{fontSize: 16,justifyContent:"flex-start",textAlign:"left"}}> {this.state.name}</Text>
      
        
        <View style={{ alignItems: "flex-end", marginTop: 64 }}>
            <TouchableOpacity onPress={this.continue}>
             <AntDesign name="message1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
      

      </View>
    
    )
  }
}
