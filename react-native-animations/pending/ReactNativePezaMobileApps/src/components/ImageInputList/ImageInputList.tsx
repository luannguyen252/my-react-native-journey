/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Box, theme, Text } from '..';
import ImageInput from '../ImageInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    width: theme.constants.screenWidth,
    marginVertical: 10,
  },
});

interface Props {
  imgUris: string[];
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string | null) => void;
}

const ImageInputList = ({ imgUris = [], onRemoveImage, onAddImage }: Props) => {
  const scrollView = useRef<any>();

  return (
    <Box>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd}
        bounces={false}>
        <Box style={styles.container}>
          {imgUris.map((uri) => (
            <Box style={{ marginRight: 10, marginBottom: 10 }} key={uri}>
              <ImageInput imgUri={uri} onChangeImage={() => onRemoveImage(uri)} />
            </Box>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ImageInputList;
