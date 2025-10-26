import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name:any, params?:any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function onBack() {
  navigationRef.current?.goBack();
}

export function replace(name:any, params:any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function reset(name:any) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name}],
    }),
  );
}
