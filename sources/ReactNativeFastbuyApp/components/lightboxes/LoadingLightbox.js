import React from 'react';
import { ActivityIndicator } from 'react-native';
import Lightbox from './Lightbox';
import colors from '../../colors';

const LoadingLightbox = () => (
  <Lightbox>
    <ActivityIndicator size="large" color={colors.black} />
  </Lightbox>
);

export { LoadingLightbox };
