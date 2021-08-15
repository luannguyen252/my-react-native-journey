/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Feather as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

import { Box, theme, Text } from '../../components';
import { StackHeader } from '../../components/StackHeader';
import { ProfileNavParamList } from '../../types/navigation.types';
import { Button } from '../../components/Button';
import ImageInputList from '../../components/ImageInputList';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.constants.screenPadding / 2,
    paddingTop: theme.constants.screenPadding,
    flex: 1,
  },
  headerText: {
    alignSelf: 'flex-start',
    width: '70%',
    lineHeight: 35,
    marginBottom: hp(4),
    paddingTop: theme.constants.screenPadding,
  },
  uploadContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.constants.screenWidth,
    height: hp(50),
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  uploadContainerWithImg: {},
  imageSlider: {},
});

// interface Props {}

const NewListingImg = ({
  navigation,
  route,
}: StackScreenProps<ProfileNavParamList, 'NewListingImg'>) => {
  const { listing } = route.params;

  const [imgUris, setImgUris] = useState<string[]>([]);

  const data: any = {
    ...listing,
    images: imgUris,
  };

  const handleNext = () => {
    if (imgUris.length < 5) {
      return Toast.show({
        type: 'error',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        text1: 'Listing Image',
        text2: 'Add at least 5 images to continue.',
      });
    } else {
      navigation.navigate('NewListingFinal', { listing: data });
    }
  };

  // BFAE06600A60.png
  // 28043D69E0F0.png
  // 1E0ABF3A94B7.png
  // 69591ACE5630.png
  // E8C79968955D.png

  const onAddImage = (uri: string | null) => {
    const newUris = [...imgUris, uri as string];
    // console.log(newUris);
    setImgUris(newUris);
  };

  const onRemoveImage = (uri: string | null) => {
    setImgUris(imgUris.filter((i) => i !== uri));
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      if (!result.cancelled) {
        // await imageUpload(result.uri);
        onAddImage(result.uri);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('Error reading image: ' + error);
    }
  };

  return (
    <Box style={styles.container}>
      <StackHeader onPressBack={() => navigation.goBack()} title="Step 3 of 4" />

      <Text variant="h1Max" color="dark" style={styles.headerText}>
        Upload photos
      </Text>

      <Box style={styles.uploadContainer}>
        {imgUris.length > 0 ? (
          <ScrollView>
            <ImageInputList {...{ onAddImage, onRemoveImage, imgUris }} />
          </ScrollView>
        ) : (
          <>
            <Icon name="plus-square" color={theme.colors.veryLightPurple} size={55} />

            <Text variant="h2" color="text" marginVertical="xxl">
              Upload at least 5 photos
            </Text>

            <Button
              type="primary"
              label="Upload photos"
              width={wp(45)}
              height={hp(8)}
              borderRad={7}
              onPress={() => selectImage()}
            />
          </>
        )}
      </Box>

      <Box marginVertical="xxl">
        <Button
          type="purple"
          width={theme.constants.screenWidth}
          onPress={handleNext}
          label={'Final Step'}
        />
      </Box>
    </Box>
  );
};

export default NewListingImg;
