import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Button,
  KeyboardType,
  ActivityIndicator
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS, SIZES } from '../constants/theme';
import icons from '../constants/icons';
import { artists, devotionals, originalArtists, tems } from '../constants/strings';
import { ThemeContext } from '../utils/theme-context';



export const SearchComponent = ({ onSearch }) => {

  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
    // clearSearchText();
  };

  // const handleSearch = () => {
  //   if (searchText.trim() !== '') {
  //     onSearch(searchText);
  //   } else {
  //     clearSearchText();
  //   }
  // };

  // const clearSearchText = () => {
  //   setSearchText('');
  // };

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
      <TouchableOpacity onPress={() => console.log('search')}>
        <Image
          source={icons.search}
          style={styles.search}
        />
      </TouchableOpacity>
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


// DRAWER BUTTON
// const down_arrow = 'https://cdn-icons-png.flaticon.com/512/32/32195.png';

// Loader
export const CustomLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="small" color="#454545" />
    </View>
  );
};

// Progress bar
export const ProgressBar = ({ progress }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setProgressWidth(progress * 100);
  }, [progress]);

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progressWidth}%` }]}></View>
      <Text style={styles.progressText}>{`${progressWidth}%`}</Text>
    </View>
  );
};

export const FooterDetails = ({
  titleHeader,
  categoryData
}) => {
  let data = [];

  if (categoryData === 'artists') {
    data = artists;
  } else if (categoryData === 'devotionals') {
    data = devotionals;
  } else if (categoryData === 'originalArtists') {
    data = originalArtists;
  } else if (categoryData === 'tems') {
    data = tems;
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.support1,
          marginVertical: SIZES.padding * 2
        }}>{titleHeader}</Text>
      {data.map((item, index) => (
        <Text
          key={index}
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: COLORS.support1,
            marginVertical: SIZES.padding,
          }}>{item}</Text>
      ))}
    </View>
  )
};

export const SocialIcons = ({
  source
}) => {
  return (
    <View>
      <Image
        source={source}
        style={{
          height: 15,
          width: 15,
          tintColor: COLORS.support1,
          marginHorizontal: SIZES.padding
        }}
      />
    </View>
  )
};

// socialIcons: {
//   height: 15,
//   width: 15,
//   tintColor: COLORS.support1,
//   marginHorizontal: SIZES.padding
// },


const appComponent = {
  SearchComponent,
  TextButton,
  Separator,
  Input,
  DropdownPicker,
  Toast,
  CustomLoader,
  ProgressBar,
  FooterDetails,
  SocialIcons
}


const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: COLORS.grey20,
      marginBottom: SIZES.padding * 2
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
    progressBarContainer: {
      backgroundColor: '#F5F5F5',
      height: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
    },
    progressBar: {
      height: 20,
      borderRadius: 10,
      backgroundColor: '#1E90FF',
    },
    progressText: {
      color: '#000',
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 5,
    },
  })


export default appComponent;


// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     borderRadius: 10,
//     backgroundColor: COLORS.grey20,
//     marginBottom: SIZES.padding * 2
//   },
//   input: {
//     width: '80%',
//     height: 50,
//     paddingHorizontal: 5,
//   },
//   search: {
//     height: 20,
//     width: 20,
//     tintColor: COLORS.grey
//   },
//   toastContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     padding: 14,
//     zIndex: -1,
//     borderRadius: 25,
//   },
//   message: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   progressBarContainer: {
//     backgroundColor: '#F5F5F5',
//     height: 20,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 5,
//   },
//   progressBar: {
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#1E90FF',
//   },
//   progressText: {
//     color: '#000',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
// })