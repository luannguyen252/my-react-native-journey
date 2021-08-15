import React, { Component } from 'react'
import {Dimensions,View,Image} from "react-native";
import images from "./../BaseClass/Images";
const { width, height } = Dimensions.get('window');

 class Constant {
  

    getMethod = (url, callback) => {
        fetch(url, {
            }).then((response) => response.json())
            .then((responseJson) => {
                callback({success: true,result:responseJson});
            })
            .catch((error) => {
            callback({success: false,result:''});
        });
    };

    noDataView()
    {
      return(
        <View style = {{height:height,width:width ,justifyContent:'center',alignItems:'center'}}>
          <Image resizeMode={'center'} style={{top:-25, width:'80%',height:'80%'}} source = {images.empty}/>
          </View>
      )
    }
}


module.exports = new Constant()