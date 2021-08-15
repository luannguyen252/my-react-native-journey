import { LayoutAnimation, Platform, UIManager } from 'react-native';

let defaultConfig = {
  duration: 250,
  type: 'easeInEaseOut',
  property: 'opacity',
};

/**
 * @prop {number} duration - animation duration
 * @prop {string} type - type of animation (ex. easeInEaseOut);
 * @prop {string} property - animation property (opacity, scaleXY)
 */

export const initialAnimation = config => {
  if (config) {
    defaultConfig.duration = config.duration || defaultConfig.duration;
    defaultConfig.type = config.type || defaultConfig.type;
    defaultConfig.property = config.property || defaultConfig.property;
  };
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};


/**
 * @prop {number} duration - animation duration
 * @prop {string} type - type of animation (ex. easeInEaseOut);
 * @prop {string} property - animation property (opacity, scaleXY)
 */

export const animateLayout = config => {
  LayoutAnimation.configureNext({
    duration: config?.duration || defaultConfig.duration,
    create: {
      type: config?.type || defaultConfig.type,
      property: config?.property || defaultConfig.property,
    },
    delete: {
      type: config?.type || defaultConfig.type,
      property: config?.property || defaultConfig.property,
    },
    update: {
      type: config?.type || defaultConfig.type,
      property: config?.property || defaultConfig.property,
    },
  });
};
