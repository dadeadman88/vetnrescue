import {Alert, Dimensions, Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Device from 'react-native-device-info';

const {height, width} = Dimensions.get('screen');

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;

const fontRegularName = 'Poppins';
export const theme = {
  font: {
    light: fontRegularName + '-Light',
    lightItalic: fontRegularName + '-LightItalic',
    regular: fontRegularName + '-Regular',
    semibold: fontRegularName + '-SemiBold',
    semiboldItalic: fontRegularName + '-SemiBoldItalic',
    extraLight: fontRegularName + '-ExtraLight',
    extraLightItalic: fontRegularName + '-ExtraLightItalic',
    bold: fontRegularName + '-Bold',
    boldItalic: fontRegularName + '-BoldItalic',
    extraBold: fontRegularName + '-ExtraBold',
    extraBoldItalic: fontRegularName + '-ExtraBoldItalic',
    medium: fontRegularName + '-Medium',
  },
  fontSize: {
    headingSize: 22,
    tiny: 8,
    extraVSmall: 10,
    extraSmall12: 12,
    extraSmall: 13,
    small: 14,
    medium: 15,
    regular: 16,
    large: 18,
    large20: 20,
    large24: 24,
    large26: 26,
    extraLarge: 28,
  },
  color: {
    primary: '#E3286C',
    tgray: '#999B9F',
    google: '#fff',
    facebook: '#3A589B',
    apple: '#2E2E2E',
    divider: '#E6E8EE',
  },
};

export const CheckIfValid = (
  index: number,
  isValid: boolean,
  state: boolean[],
  setState: React.Dispatch<React.SetStateAction<boolean[]>>,
) => {
  const copy = [...state];
  copy[index] = isValid;
  setState(copy);
};

export const PickImageFromLibrary = async (
  type = 'any',
  setImage: React.Dispatch<React.SetStateAction<null | object>>,
) => {
  if (type == 'any') {
    Alert.alert('Select Option', 'Please select an option', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Video',
        onPress: async () => {
          let images = await ImageCropPicker.openPicker({
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            mediaType: 'video',
          });

          let image = {
            uri: images.path,
            name: images.filename
              ? images.filename
              : images.path.split('/')[images.path.split('/').length - 1],
            type: images.mime,
            size: images.size,
          };
          setImage(image);
        },
      },
      {
        text: 'Photo',
        onPress: async () => {
          let images = await ImageCropPicker.openPicker({
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            cropperTintColor: '#fff',
            cropperChooseColor: '#fff',
            cropperStatusBarColor: theme.color.primary,
            cropperToolbarWidgetColor: 'white',
            cropperToolbarColor: theme.color.primary,
            mediaType: 'photo',
            cropping: true,
            freeStyleCropEnabled: true,
          });

          let image = {
            uri: images.path,
            name: images.filename
              ? images.filename
              : images.path.split('/')[images.path.split('/').length - 1],
            type: images.mime,
            size: images.size,
          };
          setImage(image);
        },
      },
    ]);
  } else {
    let images = await ImageCropPicker.openPicker({
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      cropperTintColor: '#fff',
      cropperChooseColor: '#fff',
      cropperStatusBarColor: theme.color.primary,
      cropperToolbarWidgetColor: 'white',
      cropperToolbarColor: theme.color.primary,
      mediaType: type,
    });

    let image = {
      uri: images.path,
      name: images.filename
        ? images.filename
        : images.path.split('/')[images.path.split('/').length - 1],
      type: images.mime,
      size: images.size,
    };
    setImage(image);
  }
};

export const PickImageFromCamera = async (
  type = 'any',
  setImage: React.Dispatch<React.SetStateAction<null | object>>,
) => {
  if (type == 'any') {
    Alert.alert(
      'Select Option',
      'Please select an option',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Video',
          onPress: async () => {
            let images = await ImageCropPicker.openCamera({
              compressImageQuality: 0.9,
              compressVideoPreset: 'MediumQuality',
              mediaType: 'video',
            });

            let image = {
              uri: images.path,
              name: images.filename
                ? images.filename
                : images.path.split('/')[images.path.split('/').length - 1],
              type: images.mime,
              size: images.size,
            };
            setImage(image);
          },
        },
        {
          text: 'Photo',
          onPress: async () => {
            let images = await ImageCropPicker.openCamera({
              compressImageQuality: 1,
              compressVideoPreset: 'MediumQuality',
              cropperTintColor: '#fff',
              cropperChooseColor: '#fff',
              cropperStatusBarColor: theme.color.primary,
              cropperToolbarWidgetColor: 'white',
              cropperToolbarColor: theme.color.primary,
              mediaType: 'photo',
              cropping: true,
              freeStyleCropEnabled: true,
            });

            let image = {
              uri: images.path,
              name: images.filename
                ? images.filename
                : images.path.split('/')[images.path.split('/').length - 1],
              type: images.mime,
              size: images.size,
            };
            setImage(image);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  } else {
    let images = await ImageCropPicker.openCamera({
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      cropperTintColor: '#fff',
      cropperChooseColor: '#fff',
      cropperStatusBarColor: theme.color.primary,
      cropperToolbarWidgetColor: 'white',
      cropperToolbarColor: theme.color.primary,
      mediaType: type,
    });

    let image = {
      uri: images.path,
      name: images.filename
        ? images.filename
        : images.path.split('/')[images.path.split('/').length - 1],
      type: images.mime,
      size: images.size,
    };
    setImage(image);
  }
};

export const AskToPickImage = (
  type = 'any',
  setImage: React.Dispatch<React.SetStateAction<null | object>>,
) => {
  Alert.alert(
    'Select an option',
    'Please selection one to continue',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () => PickImageFromCamera(type, setImage),
      },
      {
        text: 'Library',
        onPress: () => PickImageFromLibrary(type, setImage),
      },
    ],
    {
      cancelable: true,
    },
  );
};

export const TYPES = [
  'EXCITED',
  'EXTREMELY_EXCITED',
  'NOT_INTERESTED',
  'NOT_EXCITED',
  'HATE_IT',
];

export const COLORS = {
  EXCITED: '#3bb44b',
  EXTREMELY_EXCITED: '#91ca5f',
  NOT_INTERESTED: '#f35b2a',
  NOT_EXCITED: '#fab140',
  HATE_IT: '#e22126',
};

export function dhm(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000)).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000)).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000)).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return {days, hours, minutes, sec};
}

export function DummyProfilePic(gender: string | null = 'male') {
  return gender == 'female'
    ? 'https://body-count.test-cmolds.com/female-profile.png'
    : 'https://body-count.test-cmolds.com/male-profile.png';
}

export const getDeviceInfo = () => {
  return {
    device_type: Platform.OS,
    device_brand: Device.getBrand(),
    device_os:
      Platform.OS == 'android'
        ? Platform.constants?.Manufacturer + ' ' + Platform.Version
        : Platform.Version,
    udid: Device.getDeviceId(),
    app_version: Device.getVersion() + '-' + Device.getBuildNumber(),
  };
};

export const convertDataToFormData = (data: any) => {
  let formData = new FormData();
  Object.keys(data).forEach(v => formData.append(v, data[v]));
  return formData;
};

export const Initials = (name: string) => {
  if (name.split(' ').length > 1) return name[0] + name.split(' ')[1][0];
  else return name[0];
};

export const navigateToCorespondingScreen = (nav, type, data) => {
  const navToPost = () => nav.navigate('Comments', {item: {id: data}});
  switch (type) {
    case 'like':
      navToPost();
      break;
    case 'comment':
      navToPost();
      break;
    case 'post':
      navToPost();
      break;
    case 'share':
      navToPost();
      break;
    default:
      break;
  }
};
