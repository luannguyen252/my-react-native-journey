```JSX
import RNSwiper from 'react-native-3d-swiper'

onSwipeUp(index){
  //parameter returned is the index of active child
  console.log(index)
}

onSwipeDown(index){
  //parameter returned is the index of active child
  console.log(index)
}

onPress(index){
  //parameter returned is the index of active child
  console.log(index)
}

<View
 <RNSwiper
      minimumScale={0.7}  //scale of out of focus components
      minimumOpacity={0.9} // opacity of out of focus components
      overlap={60}  // the degree to which components overlap.  
      cardWidth={400} // the width of each component
      duration={100} // animation duration on swipe
      swipeThreshold={100}// minimum distance to swipe to trigger change in state 
      onSwipeUp={this.onSwipeUp}
      onSwipeDown={this.onSwipeDown}
      onPress={this.onPress}
      >
        <SwipeCard color="#ebebeb" text="Hellooooo"/> {/* Takes any component as child */}
        <SwipeCard color="#998877" text="Hellooooo"/>
        <SwipeCard color="#123abc" text="Hellooooo"/>
        <SwipeCard color="#ebebeb" text="Hellooooo"/>
        <SwipeCard color="#987654" text="Hellooooo"/>
    </RNSwiper>
</View>
```

### Installing

```
npm i --save react-native-3d-swiper
```