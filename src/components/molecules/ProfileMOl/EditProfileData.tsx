import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../globalStyle";
import ProfileImg from "../../atoms/Profile/ProfileImg";
import { onBack } from "../../../navigation/RootNavigation";
import { CustomBtn } from "../../atoms/OnBoardingAtoms/OnBeardingBottomBtn";
import { InputText } from "../../atoms/InputText";
import { useSelector, useDispatch } from "react-redux";
import { States } from "../../../utils/types";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { MainActions } from "../../../redux/actions/MainActions";
import { AppDispatch } from "../../../redux/store";
import { theme } from "../../../constants";
import { verticalScale } from "react-native-size-matters";
import { ToastPresets } from "react-native-ui-lib";
import { showHideToast } from "../../../redux/slices/OtherSlice";

const EditProfileData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: States) => state.Others.language);
  const isRTL = language === 'ar';
  const countries = useSelector((state: States) => state.Main.Countries);
  const states = useSelector((state: States) => state.Main.States);
  const cities = useSelector((state: States) => state.Main.Cities);
  
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  
  // Validation state for required fields
  const [validationState, setValidationState] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    description: false,
  });
  
  // Country dropdown state
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState<string | null>(null);
  const [countryItems, setCountryItems] = useState([
    { label: 'United Arab Emirates', value: 'UAE' },
    { label: 'Saudi Arabia', value: 'KSA' },
  ]);
  
  // State dropdown state
  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState<string | null>(null);
  const [stateItems, setStateItems] = useState([
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
    { label: 'Riyadh', value: 'Riyadh' },
    { label: 'Jeddah', value: 'Jeddah' },
  ]);
  
  // City dropdown state
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState<string | null>(null);
  const [cityItems, setCityItems] = useState([
    { label: 'Downtown Dubai', value: 'Downtown Dubai' },
    { label: 'Marina', value: 'Marina' },
    { label: 'Al Khalidiyah', value: 'Al Khalidiyah' },
    { label: 'Al Markaziyah', value: 'Al Markaziyah' },
    { label: 'Al Olaya', value: 'Al Olaya' },
    { label: 'Al Hamra', value: 'Al Hamra' },
  ]);

  // Call API when component is focused
  useFocusEffect(
    React.useCallback(() => {
      dispatch(MainActions.GetCountries());
    }, [dispatch])
  );

  // Load states when country is selected
  useEffect(() => {
    if (countryValue && countries && Array.isArray(countries) && countries.length > 0) {
      const selectedCountry = countries.find((country: any) => {
        const countryVal = country.id?.toString() || country.code || country.value || String(country);
        return countryVal === countryValue;
      });
      const countryCode = selectedCountry?.code?.toLowerCase() || 
                          selectedCountry?.id?.toString()?.toLowerCase() || 
                          countryValue?.toLowerCase();
      if (countryCode) {
        dispatch(MainActions.GetStates({ countryCode }));
      }
    }
  }, [countryValue, countries, dispatch]);

  // Load cities when state is selected
  useEffect(() => {
    if (stateValue && states && Array.isArray(states) && states.length > 0) {
      const selectedState = states.find((state: any) => {
        const stateVal = state.id?.toString() || state.code || state.value || String(state);
        return stateVal === stateValue;
      });
      const stateCode = selectedState?.code?.toLowerCase() || 
                        selectedState?.id?.toString()?.toLowerCase() || 
                        stateValue?.toLowerCase();
      if (stateCode) {
        dispatch(MainActions.GetCities({ stateCode }));
      }
    }
  }, [stateValue, states, dispatch]);

  // Update country items when countries data is loaded
  useEffect(() => {
    if (countries && Array.isArray(countries) && countries.length > 0) {
      const formattedCountries = countries.map((country: any) => ({
        label: country.name || country.title || country.label || country.country_name || String(country),
        value: country.id?.toString() || country.code || country.value || String(country),
      }));
      setCountryItems(formattedCountries);
    }
  }, [countries]);

  // Update state items when states data is loaded
  useEffect(() => {
    if (!countryValue) {
      setStateItems([{
        label: language === 'ar' ? 'لا توجد ولايات متاحة' : 'No states available',
        value: '__empty__',
        disabled: true,
      }] as any);
      setStateValue(null);
    } else if (states) {
      const statesObj = states as any;
      if (!Array.isArray(states) && statesObj?.error === true) {
        const errorMessage = statesObj?.message || "No states found for this country";
        setStateItems([{
          label: errorMessage,
          value: '__empty__',
          disabled: true,
        }] as any);
        setStateValue(null);
      } else if (Array.isArray(states) && states.length > 0) {
        const formattedStates = states.map((state: any) => ({
          label: state.name || state.title || state.label || state.state_name || String(state),
          value: state.id?.toString() || state.code || state.value || String(state),
        }));
        setStateItems(formattedStates);
      } else {
        setStateItems([{
          label: "No states found for this country",
          value: '__empty__',
          disabled: true,
        }] as any);
        setStateValue(null);
      }
    }
  }, [states, countryValue, language]);

  // Update city items when cities data is loaded
  useEffect(() => {
    if (!stateValue) {
      setCityItems([{
        label: language === 'ar' ? 'لا توجد مدن متاحة' : 'No cities available',
        value: '__empty__',
        disabled: true,
      }] as any);
      setCityValue(null);
    } else if (cities) {
      const citiesObj = cities as any;
      if (!Array.isArray(cities) && citiesObj?.error === true) {
        const errorMessage = citiesObj?.message || "No cities found for this state";
        setCityItems([{
          label: errorMessage,
          value: '__empty__',
          disabled: true,
        }] as any);
        setCityValue(null);
      } else if (Array.isArray(cities) && cities.length > 0) {
        const formattedCities = cities.map((city: any) => ({
          label: city.name || city.title || city.label || city.city_name || String(city),
          value: city.id?.toString() || city.code || city.value || String(city),
        }));
        setCityItems(formattedCities);
      } else {
        setCityItems([{
          label: "No cities found for this state",
          value: '__empty__',
          disabled: true,
        }] as any);
        setCityValue(null);
      }
    }
  }, [cities, stateValue, language]);

  // Handle form submission
  const handleSubmit = async () => {
    // Check if all required fields are filled
    const isFullNameValid = fullName.trim().length > 0;
    const isPhoneValid = phoneNumber.trim().length > 0;
    const isEmailValid = email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isDescriptionValid = description.trim().length > 0;

    // Update validation state to trigger error display
    setValidationState({
      fullName: !isFullNameValid,
      phoneNumber: !isPhoneValid,
      email: !isEmailValid,
      description: !isDescriptionValid,
    });

    // Show toast messages for validation errors
    if (!isFullNameValid) {
      dispatch(
        showHideToast({
          visible: true,
          message: language === 'ar' ? "الاسم الكامل مطلوب" : "Full Name is required",
          preset: ToastPresets.FAILURE,
        })
      );
      return;
    }

    if (!isPhoneValid) {
      dispatch(
        showHideToast({
          visible: true,
          message: language === 'ar' ? "رقم الهاتف مطلوب" : "Phone Number is required",
          preset: ToastPresets.FAILURE,
        })
      );
      return;
    }

    if (!isEmailValid) {
      const emailMessage = email.trim().length === 0
        ? (language === 'ar' ? "البريد الإلكتروني مطلوب" : "Email is required")
        : (language === 'ar' ? "البريد الإلكتروني غير صحيح" : "Email is invalid");
      dispatch(
        showHideToast({
          visible: true,
          message: emailMessage,
          preset: ToastPresets.FAILURE,
        })
      );
      return;
    }

    if (!isDescriptionValid) {
      dispatch(
        showHideToast({
          visible: true,
          message: language === 'ar' ? "الرسالة مطلوبة" : "Message is required",
          preset: ToastPresets.FAILURE,
        })
      );
      return;
    }

    // If all required fields are valid, proceed with API call
    if (isFullNameValid && isPhoneValid && isEmailValid && isDescriptionValid) {
      try {
        // Extract IDs from selected values
        let countryId: number | null = null;
        let stateId: number | null = null;
        let cityId: number | null = null;

        // Get country ID
        if (countryValue && countries && Array.isArray(countries)) {
          const selectedCountry = countries.find((country: any) => {
            const countryVal = country.id?.toString() || country.code || country.value || String(country);
            return countryVal === countryValue;
          });
          if (selectedCountry?.id) {
            countryId = typeof selectedCountry.id === 'number' ? selectedCountry.id : parseInt(selectedCountry.id);
          } else if (countryValue) {
            // If value is already a number, use it directly
            const parsed = parseInt(countryValue);
            if (!isNaN(parsed)) {
              countryId = parsed;
            }
          }
        }

        // Get state ID
        if (stateValue && states && Array.isArray(states)) {
          const selectedState = states.find((state: any) => {
            const stateVal = state.id?.toString() || state.code || state.value || String(state);
            return stateVal === stateValue;
          });
          if (selectedState?.id) {
            stateId = typeof selectedState.id === 'number' ? selectedState.id : parseInt(selectedState.id);
          } else if (stateValue) {
            const parsed = parseInt(stateValue);
            if (!isNaN(parsed)) {
              stateId = parsed;
            }
          }
        }

        // Get city ID
        if (cityValue && cities && Array.isArray(cities)) {
          const selectedCity = cities.find((city: any) => {
            const cityVal = city.id?.toString() || city.code || city.value || String(city);
            return cityVal === cityValue;
          });
          if (selectedCity?.id) {
            cityId = typeof selectedCity.id === 'number' ? selectedCity.id : parseInt(selectedCity.id);
          } else if (cityValue) {
            const parsed = parseInt(cityValue);
            if (!isNaN(parsed)) {
              cityId = parsed;
            }
          }
        }

        // Prepare API payload
        const payload = {
          full_name: fullName.trim(),
          phone_number: phoneNumber.trim(),
          message: description.trim(),
          email: email.trim(),
          ...(countryId && { country_id: countryId }),
          ...(stateId && { state_id: stateId }),
          ...(cityId && { city_id: cityId }),
        };

        // Call API
        const result = await dispatch(MainActions.SubmitContact(payload)).unwrap();
        
        // Show success message
        dispatch(
          showHideToast({
            visible: true,
            message: language === 'ar' ? "تم إرسال الرسالة بنجاح" : "Message sent successfully",
            preset: ToastPresets.SUCCESS,
          })
        );

        // Navigate back on success
        onBack();
      } catch (error: any) {
        // Error handling is done by the axios interceptor, but we can add additional handling here if needed
        console.error('Error submitting contact form:', error);
        // The interceptor already shows the error toast, so we don't need to show it again
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={commonStyles.footerContainer}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputText
          value={fullName}
          placeholder={language === 'ar' ? "الاسم الكامل" : "Full Name"}
          onChangeText={(text: string) => setFullName(text)}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
          validate={["required"]}
          validationMessage={[language === 'ar' ? "الاسم الكامل مطلوب" : "Full Name is required"]}
          onValidationFailed={(isValid: boolean) => {
            setValidationState(prev => ({ ...prev, fullName: !isValid }));
          }}
        />
        <InputText
          value={phoneNumber}
          placeholder={language === 'ar' ? "رقم الهاتف" : "Phone Number"}
          style={{ marginTop: -10, textAlign: isRTL ? 'right' : 'left' }}
          onChangeText={(text: string) => setPhoneNumber(text)}
          keyboardType="phone-pad"
          validate={["required"]}
          validationMessage={[language === 'ar' ? "رقم الهاتف مطلوب" : "Phone Number is required"]}
          onValidationFailed={(isValid: boolean) => {
            setValidationState(prev => ({ ...prev, phoneNumber: !isValid }));
          }}
        />
        <InputText
          value={email}
          placeholder={language === 'ar' ? "البريد الإلكتروني" : "Email"}
          style={{ marginTop: -10, textAlign: isRTL ? 'right' : 'left' }}
          onChangeText={(text: string) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          validate={["required", "email"]}
          validationMessage={[
            language === 'ar' ? "البريد الإلكتروني مطلوب" : "Email is required",
            language === 'ar' ? "البريد الإلكتروني غير صحيح" : "Email is invalid"
          ]}
          onValidationFailed={(isValid: boolean) => {
            setValidationState(prev => ({ ...prev, email: !isValid }));
          }}
        />
        
        {/* Country Dropdown */}
        <View style={{ marginTop: -10, zIndex: 2000 }}>
          <DropDownPicker
            open={countryOpen}
            value={countryValue}
            items={countryItems}
            setOpen={(isOpen) => {
              const newValue = typeof isOpen === 'function' ? isOpen(countryOpen) : isOpen;
              setCountryOpen(newValue);
              if (newValue) {
                setStateOpen(false);
                setCityOpen(false);
              }
            }}
            setValue={setCountryValue}
            onChangeValue={(value) => {
              let stringValue: string | null = null;
              if (value === null || value === undefined) {
                stringValue = null;
              } else if (typeof value === 'string') {
                stringValue = value;
              } else if (typeof value !== 'function') {
                stringValue = String(value);
              }
              
              // Clear states and city when country changes
              setStateItems([]);
              setStateValue(null);
              setCityItems([]);
              setCityValue(null);
              
              // Call API to get states for selected country
              if (stringValue && countries && Array.isArray(countries)) {
                const selectedCountry = countries.find((country: any) => {
                  const countryVal = country.id?.toString() || country.code || country.value || String(country);
                  return countryVal === stringValue;
                });
                
                const countryCode = selectedCountry?.code?.toLowerCase() || 
                                   selectedCountry?.id?.toString()?.toLowerCase() || 
                                   stringValue?.toLowerCase();
                if (countryCode) {
                  dispatch(MainActions.GetStates({ countryCode }));
                }
              }
            }}
            setItems={setCountryItems}
            placeholder={language === 'ar' ? 'اختر الدولة' : 'Select Country'}
            style={styles.dropdownPicker}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            zIndex={2000}
            zIndexInverse={1000}
          />
        </View>

        {/* State Dropdown */}
        <View style={{ marginTop: -10, zIndex: 1000 }}>
          <DropDownPicker
            open={stateOpen}
            value={stateValue}
            items={stateItems}
            setOpen={(isOpen) => {
              const newValue = typeof isOpen === 'function' ? isOpen(stateOpen) : isOpen;
              setStateOpen(newValue);
              if (newValue) {
                setCountryOpen(false);
                setCityOpen(false);
              }
            }}
            setValue={setStateValue}
            onChangeValue={(value) => {
              let stringValue: string | null = null;
              if (value === null || value === undefined) {
                stringValue = null;
              } else if (typeof value === 'string') {
                stringValue = value;
              } else if (typeof value !== 'function') {
                stringValue = String(value);
              }
              
              // Clear cities when state changes
              setCityItems([]);
              setCityValue(null);
              
              // Call API to get cities for selected state
              if (stringValue && states && Array.isArray(states)) {
                const selectedState = states.find((state: any) => {
                  const stateVal = state.id?.toString() || state.code || state.value || String(state);
                  return stateVal === stringValue;
                });
                
                const stateCode = selectedState?.code?.toLowerCase() || 
                                 selectedState?.id?.toString()?.toLowerCase() || 
                                 stringValue?.toLowerCase();
                if (stateCode) {
                  dispatch(MainActions.GetCities({ stateCode }));
                }
              }
            }}
            setItems={setStateItems}
            placeholder={language === 'ar' ? 'اختر الولاية' : 'Select State'}
            disabled={!countryValue || (stateItems.length === 1 && (stateItems[0] as any)?.disabled)}
            style={styles.dropdownPicker}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            zIndex={1000}
            zIndexInverse={2000}
          />
        </View>

        {/* City Dropdown */}
        <View style={{ marginTop: -10, zIndex: 500 }}>
          <DropDownPicker
            open={cityOpen}
            value={cityValue}
            items={cityItems}
            setOpen={(isOpen) => {
              const newValue = typeof isOpen === 'function' ? isOpen(cityOpen) : isOpen;
              setCityOpen(newValue);
              if (newValue) {
                setCountryOpen(false);
                setStateOpen(false);
              }
            }}
            setValue={setCityValue}
            onChangeValue={(value) => {
              // Just update local state, don't persist to Redux
            }}
            setItems={setCityItems}
            placeholder={language === 'ar' ? 'اختر المدينة' : 'Select City'}
            disabled={!stateValue || (cityItems.length === 1 && (cityItems[0] as any)?.disabled)}
            style={styles.dropdownPicker}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            zIndex={500}
            zIndexInverse={2500}
          />
        </View>

        <InputText
          value={description}
          placeholder={language === 'ar' ? "رسالة" : "Message"}
          multiline={true}
          style={{
            paddingTop: 10,
            marginTop: -10,
            height: 150,
            textAlign: isRTL ? 'right' : 'left',
            textAlignVertical: 'top',
          }}
          onChangeText={(text: string) => setDescription(text)}
          validate={["required"]}
          validationMessage={[language === 'ar' ? "الرسالة مطلوبة" : "Message is required"]}
          onValidationFailed={(isValid: boolean) => {
            setValidationState(prev => ({ ...prev, description: !isValid }));
          }}
        />

        <View marginV-40>
          <CustomBtn label={language === 'ar' ? "إرسال" : "Submit"} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdownPicker: {
    backgroundColor: theme.color.inputTypeColor,
    borderWidth: 0,
    borderRadius: 10,
    height: verticalScale(50),
    marginVertical: verticalScale(15)
  },
  dropdownContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.divider,
    ...commonStyles.boxShadow,
  },
  dropdownText: {
    fontSize: theme.fontSize.medium,
  },
  dropdownLabel: {
    fontSize: theme.fontSize.medium,
  },
});

export default EditProfileData;
