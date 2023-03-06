import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
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
      />
      <Image
        source={icons.search}
        style={styles.search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
    flexDirection: 'row',
    //borderWidth: 0.2,
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
  }
});


export const TextButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
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
  labelStyle
}) => {
  return (
    <View>
      <Text
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

const appComponent = { SearchComponent, TextButton, Separator }

export default appComponent


