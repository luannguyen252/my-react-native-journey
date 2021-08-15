import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';

import {
  Box,
  StackHeader,
  theme,
  Button,
  CustomerCard,
} from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { CartNavParamList, CustomerCardDetailsProp } from '../../../types';
import { useAppContext } from '../../context/context';
import { customerCardDetails } from '../../data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    height,
    paddingBottom: 20,
  },
});

interface ChooseCardProps {}

const ChooseCard = ({
  navigation,
}: StackScreenProps<CartNavParamList, 'ChooseCard'>) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  const { cartTotal, manageCart } = useAppContext();
  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ alignItems: 'center', height: height * 0.86 }}>
        <StackHeader
          title="Choose Card"
          back={() => navigation.goBack()}
          plus={() => true}
        />
        <Box>
          <AnimatedFlatList
            scrollEventThrottle={16}
            bounces={false}
            {...{ onScroll }}
            showsVerticalScrollIndicator={false}
            data={customerCardDetails}
            keyExtractor={({ id }: CustomerCardDetailsProp) => id.toString()}
            renderItem={({ index, item }: any) => (
              <TouchableWithoutFeedback
                style={{ marginVertical: 10, alignSelf: 'center' }}
                onPress={() => {
                  manageCart('EMPTY_CART');
                  navigation.navigate('Success');
                }}
              >
                <CustomerCard customerCard={item} y={y} index={index} />
              </TouchableWithoutFeedback>
            )}
          />
          <Box style={{ paddingBottom: 60 }} />
        </Box>

        <Box style={{ flex: 1 }} />
      </Box>
    </SafeAreaView>
  );
};

export default ChooseCard;
