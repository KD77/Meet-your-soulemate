import React from "react";
import { View, Text, StyleSheet, Image,FlatList,SafeAreaView,TouchableOpacity } from "react-native";
import firebase, { firestore } from "firebase";
import Fire from "../Fire";
export default class NotificationScreen extends React.Component {

   state = {
      name: "",
      avatar: "",
      unknownUser2:[],
      user:[],
   
    };


  componentDidMount() {
    const userId = firebase.auth().currentUser;
    firebase
      .database()
      .ref()
      .child("chat")
      .on("child_added", snapshot => {
        const unknown = [...this.state.user];
        let array = snapshot.key.split("-");
        let a = array[1];
        let currentUser=array[0];
        const updated = [...unknown, { key: a ,current:currentUser}];
        snapshot.forEach(doc=>{
          doc.val();
          console.log("message",doc.val());
        });
      
        let latest=updated.map(key=>{
         
          let users = Fire.shared.firestore
          .collection("users")
          .doc(key.key)
          .get()
          .then(doc => {
            
            const users=[...this.state.user];
            let us = users.filter(el=> {
              return el != null;
            })
            
            if (doc.exists) {
              us.push({
                ...doc.data(),
                key:doc.id
       
              });
              this.setState({
                user: us,
              });
            } 
          })
          .catch(error => {
            console.error(error);
          });
        
        });
        /*this.setState({
          unknownUser2: updated.key
        });*/
 
      });

  }
  dataFeatch() {}

  render() {
    /*let latest=users.map(key=>{
           this.setState({
            id: key.key,
          });
        });*/
   // console.log("name..", this.state);
   const {user}=this.state;

    return (
      <FlatList
        style={style.warpper}
        data={user}
        //renderItem={this.Item}
        renderItem={({ item }) => (
          <SafeAreaView>
          <View style={style.container}>
          <TouchableOpacity style={style.card}
          onPress={() => this.props.navigation.navigate("Message",{id:item.key, name:item.name})}
          >
            <Image
              source={
                item.avatar
                  ? { uri: item.avatar }: require("../assets/tempAvatar.jpg") }
              style={style.cardImg}/>
              <View style={{justifyContent:'center', alignContent:'center'}}>
              <Text style={{fontWeight:"bold",color:'#000'}}>{item.name}</Text>
             </View>
          </TouchableOpacity>

        </View>
      
        </SafeAreaView>
        )}
        //renderItem={({item})=>this.Item(item)}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        // keyExtractor={item => item.key}
      />
    );
  }
}

const style = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  warpper: {
    backgroundColor: "#F5FCFF",
    marginTop: 20
  },
  container: {
    flex:1,
    backgroundColor: "#fff",
    marginTop: 10,
   
  },
  card: {
    marginBottom: 10,
    width: 80,
    height:100,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32
   
  },
  cardImg: {
    width: 60,
    height:60 ,
    borderRadius: 30,
    resizeMode: "cover",
    marginRight:5,
    justifyContent:'center',
     alignContent:'center'
  },
  cardText: {
    padding: 10,
    fontSize: 16
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16
  },
  header: {
    flexDirection:'column',
    justifyContent: "space-between"
  },
  footer: {
    // flexDirection: "row",
    alignItems:"center",
    flex:1,
  },
  txt: {
  
    color: "#000",
    fontWeight: "700",
    fontSize: 18
  }
});