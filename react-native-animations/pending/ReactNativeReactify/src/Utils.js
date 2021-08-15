import {Share} from 'react-native'
import config from '../src/config'

export const sharePost = (post) => {
    Share.share({
        message: post.reactionName +" say's, \n\n"+post.reactionMsg +"\n\n"+ post.reactionImage,
        url: post.reactionImage,
        title: config.constants.appName,
      }, {
        // Android only:
        dialogTitle: "Share",
        // iOS only:
        excludedActivityTypes: [
        //   'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));

} 