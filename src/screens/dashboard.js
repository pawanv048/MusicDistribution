import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SearchComponent, TextButton, CustomText } from '../custom/component';
import { COLORS, SIZES } from '../constants/theme';

const Dashboard = () => {

  const handleSearch = searchText => {
    console.log(`Searching for "${searchText}"...`);
  };

  function renderCardView() {
    return (
      <View style={styles.card}>
        <Text>card</Text>
      </View>
    )
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ margin: SIZES.padding * 2, paddingBottom: 100 }}
    >
      <SearchComponent onSearch={handleSearch} />
      <View style={styles.subContainer}>
        <TextButton
          label={'PREMIUM PLANS'}
        />
        <View style={{ flexDirection: 'row' }}>
          <CustomText label={'LOG IN'} labelStyle={{ marginRight: 25 }} />
          <CustomText label={'SING UP'} />
        </View>
      </View>

      {renderCardView()}
      {renderCardView()}
      {renderCardView()}
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    //margin: SIZES.padding * 2,
    //borderWidth: 1
    //backgroundColor: 'red'
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    backgroundColor: COLORS.light,
    height: SIZES.height / 2,
    marginTop: SIZES.padding * 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 8.65,
    borderRadius: 10
  }



})