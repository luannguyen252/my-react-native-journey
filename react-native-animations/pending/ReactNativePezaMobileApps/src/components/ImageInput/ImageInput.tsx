import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
});

interface Props {
  imgUri?: string;
  onChangeImage: (resultUri: string | null) => void;
}

const ImageInput: React.FC<Props> = ({ imgUri, onChangeImage }) => {
  useEffect(() => {
    void requestPermission();
    return () => {
      void requestPermission();
    };
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert('You need to enable permission to access the library.');
  };

  const handlePress = () => {
    if (!imgUri) void selectImage();
    else
      Alert.alert('Delete', 'Are you sure you want to delete this image?.', [
        { text: 'Yes', onPress: () => onChangeImage(null) },
        { text: 'No' },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('Error reading image: ' + error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        borderRadius: 16,
        overflow: 'hidden',
      }}
      onPress={handlePress}>
      {!imgUri && (
        <Box
          style={{
            backgroundColor: theme.colors.lightGrey,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="camera" color={theme.colors.white} size={30} />
        </Box>
      )}
      {imgUri && (
        <Box
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={{ uri: imgUri }} style={{ width: '100%', height: '100%' }} />
        </Box>
      )}
    </TouchableOpacity>
  );
};

export default ImageInput;
