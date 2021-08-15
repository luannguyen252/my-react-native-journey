import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  Platform,
  Animated,
  StatusBar,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import Constant from "./../BaseClass/Constant";
import Urls from "./../BaseClass/ServiceUrls";
import ImageLoad from "./../BaseClass/ImageLoader";
import images from "./../BaseClass/Images";
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');


class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {

        selectedData : props.route.params.selectedData
     
    }

  }

  componentDidMount()
  {
     
  }


  render()
  {

      const {selectedData} = this.state
      return(
          <SafeAreaView style = {styles.container}>

          {/* Image */}


            <TouchableOpacity
            style={styles.backBtn}
            onPress ={()=>{
                this.props.navigation.popToTop()

            }}>
            <Image style = {{height:30,width:30}} source = {images.back}/>
            </TouchableOpacity>

            <FlatList
            data={selectedData}
            numColumns={3}
            renderItem={this.renderItem}
            />
         
          </SafeAreaView>
      )
  }


  renderItem = ({item,index}) =>{
      return (
            <TouchableOpacity
             onPress={()=>{
                 this.props.navigation.navigate('Details',{selectedData:item})
             }}
             key={index}>
            <View style ={[styles.InnerView,{marginTop:index==0 || index==1 || index==2 ? 60 : 0}]}>
                
              <ImageLoad
                   resizeMode={'contain'}
                   borderRadius={5}
                    placeholderStyle={{width:120,height:120}}
                    style ={{width:120,height:120}}
                    loadingStyle={{ size: 'large'}}
                    source={{ uri:item.artworkUrl100}}
                    placeholderSource={images.placeholder}
                />

            <Text numberOfLines = {1} style = {[styles.nameText]}>{item.name}</Text>
            <Text numberOfLines = {1} style = {[styles.artistNameText]}>{item.artistName}</Text>

            </View>
            </TouchableOpacity>
          )
  }


}



//Styles
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#fff'
    },
    InnerView:{margin:10,marginLeft:5,width:(width/3)-13,alignItems: 'center',justifyContent: 'center',},
    backBtn:{backgroundColor:'rgba(255,255,255,1)',zIndex:100, width:40,top:15,left:15, padding:5,borderRadius:20}
   



})
export default Details