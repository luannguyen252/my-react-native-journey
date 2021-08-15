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

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
     appleMusicData:[],
     iosAppsData:[],
     audioBooksData:[],
    }

  }

  componentDidMount()
  {
      this.getAppleMusic()
      this.getIosApps()
      this.getAudioBooks()
  }


  render()
  {

      const {appleMusicData,iosAppsData,audioBooksData} = this.state

      return(
          <SafeAreaView style = {styles.container}>

            {appleMusicData.length <= 0 && iosAppsData.length <=0 && audioBooksData.length <=0 ? Constant.noDataView() : null}

            <ScrollView>

            {/* Apple Music Ui */}
            {appleMusicData.length > 0 ?
            <View style = {{marginTop:10,paddingLeft:15}}>
              <View style = { [styles.boxTitle,{borderTopLeftRadius:6,borderTopRightRadius:6}]}>
                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
              <Text 
              style={styles.titleStyle}>Apple music</Text>
              
              </View>
              <View style = {{flexDirection:'row',}}>
              <Text 
              onPress={()=>{
                  this.props.navigation.navigate('ViewAll',{selectedData:appleMusicData})
              }}
              style={[styles.viewAll]}>View all</Text>
              </View>

              </View>
              
              <FlatList
            data={appleMusicData.slice(0, 10)}
            horizontal
            renderItem={this.renderItem}
            />

            </View> : null }



            {/* iosApps UI */}
            {iosAppsData.length > 0 ?
            <View style = {{marginTop:10,paddingLeft:15}}>
              <View style = { [styles.boxTitle,{borderTopLeftRadius:6,borderTopRightRadius:6}]}>
                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
              <Text 
              style={styles.titleStyle}>IOS App</Text>
              
              </View>
              <View style = {{flexDirection:'row',}}>
              <Text onPress={()=>{
                  this.props.navigation.navigate('ViewAll',{selectedData:iosAppsData})
              }} style={[styles.viewAll]}>View all</Text>
              </View>

              </View>
              
             <FlatList
            data={iosAppsData.slice(0, 10)}
            horizontal
            renderItem={this.renderItem}
            />


            </View> : null }



            {/* AudioBooks */}
            {audioBooksData.length > 0 ?
            <View style = {{marginTop:10,paddingLeft:15}}>
              <View style = { [styles.boxTitle,{borderTopLeftRadius:6,borderTopRightRadius:6}]}>
                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
              <Text 
              style={styles.titleStyle}>Audiobooks</Text>
              
              </View>
             
              </View>

              <ScrollView 
             
              >
            {audioBooksData.map((item, index) => { // the _ just means we won't use that parameter
          
          return (
            <TouchableOpacity
            onPress = {()=>{
                this.props.navigation.navigate('Details',{selectedData:item})
            }}
             key={index}>
            <View style ={[styles.InnerView,{flexDirection:'row'}]}>
                
              <ImageLoad
                   resizeMode={'contain'}
                   borderRadius={5}
                    placeholderStyle={{width:120,height:120}}
                    style ={{width:120,height:120}}
                    loadingStyle={{ size: 'large'}}
                    source={{ uri:item.artworkUrl100}}
                    placeholderSource={images.placeholder}
                />
            <View style = {{alignItems:'center',flex:1,justifyContent:'center',padding:10}}>
            <Text numberOfLines = {2} style = {[styles.nameText,{width:'100%',color:'#000'}]}>{item.name}</Text>
            <Text numberOfLines = {1} style = {[styles.artistNameText,{width:'100%'}]}>{item.artistName}</Text>
            </View>
            </View>
            </TouchableOpacity>
          )

            })}
            </ScrollView>
            
             </View> : null }

            </ScrollView>
          
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
            <View style ={styles.InnerView}>
                
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



   getAppleMusic()
   {
     Constant.getMethod(Urls.appleMusci, (result) => {
      if(result.success)
      {
          let feed = result.result.feed

          if(feed != null)
          {
            this.setState({appleMusicData:feed.results})
          }

          
       
      }
        })
        
   }

getAudioBooks()
   {
     Constant.getMethod(Urls.audioBooks, (result) => {
      if(result.success)
      {
          let feed = result.result.feed
          if(feed != null)
          {
            this.setState({audioBooksData:feed.results})
          }
      }
    }) 
   }


   getIosApps()
   {
     Constant.getMethod(Urls.iosApps, (result) => {
      if(result.success)
      {
          let feed = result.result.feed

          if(feed != null)
          {
            this.setState({iosAppsData:feed.results})
          }
      }
    }) 
   }

}




//Styles
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#fff'
    },
    titleStyle:{
        fontSize:18,color:'#000',fontWeight:'bold'
    },
    
    boxTitle : {height:40,width:'100%',backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:5,paddingLeft:5},
      viewAll:{fontSize:15,marginRight:20,borderBottomWidth:1},
InnerView:{margin:10,marginLeft:5},
nameText:{textAlign:'left',height:20,width:120,  padding:2,fontSize:14,color:'#808080'},
artistNameText:{textAlign:'left',height:20, padding:2,fontSize:12,color:'#808080'},




})
export default Home