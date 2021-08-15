export const getScreenParent = (route) => {
  let parent;
  let isNavStack =
    route === 'Onboarding' ||
    route === 'SignIn' ||
    route === 'Auth' ||
    route === 'SplashScreen' ||
    route === 'SignUp' ||
    route === 'MessageDetails' ||
    route === 'PropertyManager' ||
    route === 'PropertyDetails';

  let isTabStack =
    route === 'Home' ||
    route === 'Favorites' ||
    route === 'Messages' ||
    route === 'Profile';

  if (isNavStack) {
    parent = 'NavStack';
  } else if (isTabStack) {
    parent = 'TabStack';
  }
  return parent;
};
