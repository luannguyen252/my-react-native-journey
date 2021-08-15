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

          <ImageBackground style = {{height:300,width:'100%'}} source = {{uri:selectedData.artworkUrl100}}>
          <View style = {{justifyContent:'space-between',height:'100%'}}>

            <TouchableOpacity
            style={styles.backBtn}
            onPress ={()=>{
                this.props.navigation.goBack()

            }}>
            <Image style = {{height:30,width:30}} source = {images.back}/>
            </TouchableOpacity>
          <View style = {{height:70,backgroundColor:'rgba(0,0,0,0.3)',width:'100%',padding:10,justifyContent:'space-between'}}>
          <Text numberOfLines={1} style = {styles.name}>{selectedData.name}</Text>
          <Text numberOfLines={1} style = {styles.subName}>Kind : {selectedData.kind}</Text>

          </View>

          </View>
          </ImageBackground>

          <View style = {{padding:10}}>
            <Text style = {styles.detailsText}>Artist Name: {selectedData.artistName}</Text>
            <Text style = {styles.detailsTextTwo}>Release Date: {selectedData.releaseDate}</Text>

            <Text style = {styles.detailsTextTwo}>Genres</Text>
            <ScrollView
            style = {{paddingTop:10}}
            horizontal
            >
            {
                selectedData.genres.map((item,index)=>{

                    return(
                        <View style = {[styles.genresStyle ,{marginLeft:index != 0 ? 10 : 0}]}>
                        <Text>{item.name}</Text>
                        </View>
                    )
                })
            
            }

            </ScrollView>

          </View>

        

           
          
          </SafeAreaView>
      )
  }
}



//Styles
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#fff'
    },
    backBtn:{backgroundColor:'rgba(255,255,255,1)',width:40,marginTop:15,marginLeft:15, padding:5,borderRadius:20},
    name:{fontSize:20,fontWeight:'bold',color:'#fff'},
    subName:{fontSize:14,fontWeight:'bold',color:'#fff'},
    detailsText:{fontSize:16,fontWeight:'bold',color:'#000'},
    detailsTextTwo:{fontSize:16,marginTop:15 ,fontWeight:'bold',color:'#000'},
    genresStyle:{padding: 10,borderRadius:17.5 ,height:35,backgroundColor:'#D3d3d3',justifyContent:'center',alignItems:'center'}
   



})
export default Details