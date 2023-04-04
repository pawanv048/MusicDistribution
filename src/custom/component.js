import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Button,
  KeyboardType
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS, SIZES } from '../constants/theme';
import icons from '../constants/icons';



export const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        autoCapitalize='none'
        autoCorrect={false}
        //keyboardType='email-address'
        returnKeyType='search'
      />
      <Image
        source={icons.search}
        style={styles.search}
      />
    </View>
  );
};




export const TextButton = ({
  contentContainerStyle,
  disabled = false,
  label,
  labelStyle,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: !disabled ? COLORS.primary : 'grey',
        padding: 15,
        //marginHorizontal: SIZES.padding * 1.5,
        marginVertical: SIZES.padding,
        borderRadius: 7,
        ...contentContainerStyle                      //pass style on customcomonent
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.light,
          fontSize: 15,
          fontWeight: '500',
          ...labelStyle                               ////pass style on customcomonent
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  )
};

export const CustomText = ({
  label,
  labelStyle,
  onPress
}) => {
  return (
    <View>
      <Text
        onPress={onPress}
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'rgba(17,52,85,1)',
          ...labelStyle
        }}>
        {label}
      </Text>
    </View>
  )
};

export const Separator = ({
  lineContainer
}) => {
  return (
    <View
      style={{
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 4,
        borderRadius: 2,
        //width: '40%',
        ...lineContainer
      }} />
  );
}

export const Input = ({
  placeholder,
  inputContainer,
  secureTextEntry,
  onChangeText = () => { },
  onFocus = () => { },
  value,
  error
}) => {

  const [isFocus, setIsFocus] = React.useState(false)
  return (
    <React.Fragment>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          onFocus();
          setIsFocus(true)
        }}
        onBlur={() => {
          setIsFocus(false)
        }}
        style={{
          //marginTop: SIZES.padding * 4,
          backgroundColor: 'rgb(243,243,243)',
          height: 40,
          width: '100%',
          borderWidth: 0.2,
          borderColor: COLORS.grey,
          borderRadius: 4,
          paddingLeft: 15,
          marginVertical: SIZES.padding,
          ...inputContainer
        }}
      />
      {error && (
        <Text style={{ color: 'red' }}>{error}</Text>
      )}
    </React.Fragment>
  )
};

// DropDown box

export const DropdownPicker = ({
  label,
  defaultOption,
  placeholder,
  data,
  setSelected
}) => {

  // const [selected, setSelected] = React.useState("");

  // const data = [
  //   { key: '1', value: 'Select Country' },
  //   { key: '2', value: 'India' },
  // ]

  return (
    <SelectList
      setSelected={setSelected}
      placeholder={placeholder}
      defaultOption={defaultOption}
      boxStyles={{
        backgroundColor: 'rgb(243,243,243)',
        borderRadius: 4,
        borderWidth: 0.2,
        borderColor: COLORS.grey,
        marginVertical: SIZES.padding,
      }}
      //search={false}
      data={data}
      save="value"
      maxHeight={200}
      //onSelect={() => console.log(selected)}
      dropdownStyles={{
        backgroundColor: 'rgb(243,243,243)',
        borderRadius: 4,
        borderWidth: 0.2,
        borderColor: COLORS.grey,
        // marginVertical: 0,
      }}

    />
  )
};


// TOAST COMPONENT

export const Toast = ({ toastMessage }) => {
  // Render the toast component
  return (
    <View style={[styles.toastContainer]}>
      <Text style={styles.message}>{toastMessage}</Text>
    </View>
  );
};



const appComponent = {
  SearchComponent,
  TextButton,
  Separator,
  Input,
  DropdownPicker,
  Toast
}

export default appComponent;


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: COLORS.grey20
  },
  input: {
    width: '80%',
    height: 50,
    paddingHorizontal: 5,
  },
  search: {
    height: 20,
    width: 20,
    tintColor: COLORS.grey
  },
  toastContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 14,
    zIndex: -1,
    borderRadius: 25,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});