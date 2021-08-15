import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { AccountNavParamList, CustomerCardDetailsProp } from '../../../types';

import { Box, CustomerCard, StackHeader, Text, theme } from '../../components';
import { customerCardDetails } from '../../data';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    height,
  },
});

interface PaymentInfoProps {}
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PaymentInfo = ({
  navigation,
}: StackScreenProps<AccountNavParamList, 'PaymentInfo'>) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ alignItems: 'center', height: height * 0.87 }}>
        <StackHeader
          title="Credit & Debit Card"
          back={() => navigation.goBack()}
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
                style={{ marginVertical: 20, alignSelf: 'center' }}
                onPress={() => {
                  navigation.navigate('AddCard');
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

export default PaymentInfo;
