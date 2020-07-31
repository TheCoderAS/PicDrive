import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image ,TouchableOpacity , FlatList} from 'react-native';
import firebase from 'firebase';

import Separator from './Separator'
import AllSeparator from './AllSeparator'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={user:[],imageUrl:[],displayName:'',images:[]}
  }

  getPermissionAsync=async()=>{
    if (Constants.platform.android){
      const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status!=='granted'){
        alert('Need camera permissions to continue!')
      }
    }
  }
  pickImage = async () => {
    this.getPermissionAsync();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.uploadImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  uploadImage=async(uri)=>{
    const response=await fetch(uri);
    const blob=await response.blob();

    var ref=firebase.storage().ref(this.state.user.uid+'/'+blob._data.name);
    return ref.put(blob);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
        firebase.database().ref(this.state.user.uid+'/').once('value').then((snapshot)=>{
          var displayName=snapshot.val().Name
          this.setState({displayName:displayName})
        })
      }
      firebase.storage().ref().child(this.state.user.uid+'/').listAll().then((res)=>{
        res.items.forEach((itemRef)=>{
          this.state.imageUrl.push(itemRef.toString())
        })
      })
    })
  }

  renderImage=()=>{
    return this.state.imageUrl.map((url)=>{
      return(
        <Text>{url}</Text>
      )
    })
  }
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Separator/>
            <Text style={styles.name}>{this.state.user.displayName?this.state.user.displayName:this.state.displayName}</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => {
            firebase.auth().signOut();
            }}>
            <Text style={{ color: "#fff",fontSize:15 }}>Log Out</Text>
          </TouchableOpacity>
          <AllSeparator/>
          <TouchableOpacity style={styles.uploadBtn} onPress={this.pickImage}>
            <Text style={{ color: "#fff",fontSize:15 }}>UPLOAD PHOTO</Text>
          </TouchableOpacity>
          <AllSeparator/>
          <TouchableOpacity style={styles.uploadBtn} onPress={()=>{alert(image)}}>
            <Text style={{ color: "#fff",fontSize:15 }}>Get Image Url</Text>
          </TouchableOpacity>
          <AllSeparator/>
            <View>
            {this.renderImage()}
            </View>
          <AllSeparator/>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"azure"
  },
  logoutBtn: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    top:36,
    right:5,
  },
  uploadBtn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    marginHorizontal:5,
    alignItems:"center"
  },

  name:{
    backgroundColor: 'navy',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    top:0,
    left:5,
    color:"#fff",
    marginRight:100
  }
});
export default HomeScreen;