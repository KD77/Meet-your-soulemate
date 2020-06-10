import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import Fire from "../Fire";
import SafeAreaView from "react-native-safe-area-view";

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'HomeHeader',
      headerRight: <Button
                       title="Log out"
                      
                       onPress={() => {
                         Fire.shared.signOut();
                       }}
                       color="rgba(0,122,255,1)"
                        />
  
    };
  };

  state = {
    user:[],
   
    
  };
  

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = Fire.shared.firestore.collection("users").onSnapshot(querySnapshot=>{
      const users=[];
      querySnapshot.forEach(documentSnapshot=>{
       users.push({
         ...documentSnapshot.data(),
         key:documentSnapshot.id

       });
       this.setState({
         user: users,
       });
      });
    
    });
    
      
    }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
   
    if (this.state.user.length == 0) {
      return (
        
        <View style={style.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const {user}=this.state;
    let usersData=Object.values(user)
    console.log("hello",this.state.user.name)
    return (
      
      <FlatList
        style={style.warpper}
        data={user}
        //renderItem={this.Item}
        renderItem={({ item }) => (
          <SafeAreaView>
          <View style={style.container}>
          <TouchableOpacity style={style.card}
          onPress={() => this.props.navigation.navigate("Detail",{id:item})}
          >
            <Image
              source={
                item.avatar
                  ? { uri: item.avatar }: require("../assets/tempAvatar.jpg") }
              style={style.cardImg}/>
            <View style={style.footer}>
              <Text style={style.txt}>{item.name}</Text>
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
    alignItems: "center"
  },
  warpper: {
    backgroundColor: "#F5FCFF",
    marginTop: 20
  },
  container: {
    backgroundColor: "#F5FCFF",
    marginTop: 10
  },
  card: {
    marginBottom: 10,
    width: "96%",
    marginLeft: "2%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImg: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover"
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footer: {
    // flexDirection: "row",
    position: "absolute",
    top: "80%",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
    color: "#fff"
  },
  txt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18
  }
});



 