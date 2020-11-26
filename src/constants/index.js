import calculatePortraitDimension from './calculatePortraitDimension';

export const goBack = (navigation) => () => navigation.goBack();

export const onScreen = (screen, navigation, obj) => () => {
  navigation.navigate(screen, obj);
};

export const goHome = (navigation) => () => navigation.popToTop()();

export {calculatePortraitDimension};
