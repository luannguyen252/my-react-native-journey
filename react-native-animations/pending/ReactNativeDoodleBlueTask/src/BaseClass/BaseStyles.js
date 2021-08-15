import { StyleSheet,Dimensions } from 'react-native';
import Constant from './Constant'

const { width, height } = Dimensions.get("window");


export default StyleSheet.create({
  
  headerFont:{
    fontSize:20,
    fontFamily:'TitilliumWeb-Bold',
        fontWeight: "200",
        marginLeft:18,
        color:Constant.selectedTextColor()
  },
  boldFont:{
    fontFamily:'TitilliumWeb-Bold',
        fontWeight: "200",
  },
  mediumFont:{
    fontFamily:'TitilliumWeb-Regular',
        fontWeight: "200",
  },
  regularFont:{
    fontFamily:'TitilliumWeb-Regular',
        fontWeight: "200",
  },
  
});
