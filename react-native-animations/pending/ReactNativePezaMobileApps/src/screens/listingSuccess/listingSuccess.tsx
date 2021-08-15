import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Image } from 'react-native';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
});

// interface Props {}

const ListingSuccess = ({
  navigation,
}: StackScreenProps<ProfileNavParamList, 'ListingSuccess'>) => {
  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Success" />

      <Box style={{ marginVertical: 40 }}>
        <Image
          source={require('../../../assets/images/orderSuccess.png')}
          style={{ width: theme.constants.screenWidth, height: 300 }}
        />
      </Box>

      <Text
        marginVertical="xxl"
        variant="h3"
        color="text"
        style={{ textAlign: 'center', lineHeight: 30 }}>
        Thank you for your submission. You will get a notification when your listing is active
      </Text>

      <Button
        type="purple"
        label="Finish"
        onPress={() => navigation.navigate('Profile')}
        width={theme.constants.screenWidth}
      />
    </Box>
  );
};

export default ListingSuccess;
