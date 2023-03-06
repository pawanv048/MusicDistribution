
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,

} from 'react-native';
import { SearchComponent, TextButton, CustomText, Separator } from '../custom/component';
import { COLORS, SIZES } from '../constants/theme';


const Data = [
  {
    id: 1,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg'
  },
  {
    id: 2,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg'
  },
  {
    id: 3,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg'
  },
  {
    id: 4,
    title: 'S02-E01 - Virat Kohli',
    desc: 'Catch the hottest punjab song with Guru Randhawa',
    img: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg'
  }
]

const CategoryCardData = [
  {
    id: 1,
    name: 'Big Hits!',
    details: [
      {
        id: '1',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for S02-E01 - Virat Kohli',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '2',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 2',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '3',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 3',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
    ],
  },
  {
    id: 2,
    name: 'Top Charts',
    details: [
      {
        id: '1',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 1',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '2',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 2',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '3',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 3',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Popular albums',
    details: [
      {
        id: '1',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 1',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '2',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 2',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
      {
        id: '3',
        title: 'S02-E01 - Virat Kohli',
        desc: 'This is the description for Category 1 Detail 3',
        image: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_960_720.jpg',
      },
    ],
  },

];



// Main screen
const Dashboard = () => {

  const handleSearch = searchText => {
    console.log(`Searching for "${searchText}"...`);
  };

  function renderCardView() {

    const renderCard = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          //marginHorizontal: SIZES.padding,
          alignItems: 'center',
          width: SIZES.width - 100,
          height: SIZES.height / 3,
          //backgroundColor: 'red',
          borderRadius: 10
        }}>
        <Image
          source={{ uri: item.img }}
          style={{
            width: '100%',
            height: '65%',
            resizeMode: 'cover',
            borderRadius: 10
          }}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(243,243,243,1)',
            height: 120,
            position: 'absolute',
            bottom: 0,
            borderRadius: 10
          }}
        >
          <View style={{ margin: SIZES.padding * 2 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 15
              }}
            >{item.title}</Text>
            <Text style={{
              fontSize: 15,
              lineHeight: 20,
              fontWeight: '400'
            }}>{item.desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );


    return (
      <View style={styles.card}>
        <View style={{ margin: SIZES.padding * 2 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: SIZES.padding
            }}>Best episodes of the week</Text>
          <Separator
            lineContainer={{
              width: '45%',
              height: 5
            }} />
          <Separator
            lineContainer={{
              width: '30%',
              height: 5,
              marginTop: 5
            }} />
        </View>

        {/* EPISODES CARD */}

        <FlatList
          data={Data}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 3 }} />}
          contentContainerStyle={{ paddingHorizontal: SIZES.padding * 2 }}
        />
      </View>
    )
  };

  // CATEGORIES CARD

  const renderCategoryView = () => {

    function renderItem({ item }) {

      const itemNameLength = item.name.length;

      return (

        <View
          style={{
            flex: 1,
            marginHorizontal: SIZES.padding * 2,
            marginTop: SIZES.padding * 3
          }}>
          <Text
            style={styles.categoryTitle}
          >{item.name}</Text>
          <Separator
            lineContainer={{
              width: `${(itemNameLength * 3)}%`,
              height: 5
            }} />
          <Separator
            lineContainer={{
              width: `${(itemNameLength * 2)}%`,
              height: 5,
              marginTop: 5
            }} />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            horizontal
          >
            {item.details.map((detail) => (
              <TouchableOpacity
                key={detail.id}
                style={{
                  marginRight: SIZES.padding * 2,
                  //marginLeft: SIZES.padding * 0.5,
                  marginTop: SIZES.padding * 1.5,
                  alignItems: 'center',
                  width: SIZES.width - 100,
                  height: SIZES.height / 3,
                  //backgroundColor: 'red',
                  borderRadius: 10
                }}
              >
                <Image
                  source={{ uri: detail.image }}
                  style={{
                    width: '100%',
                    height: '65%',
                    resizeMode: 'cover',
                    borderRadius: 10
                  }}
                />
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(243,243,243,1)',
                    height: 120,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 10
                  }}
                >
                  <View style={{ margin: SIZES.padding * 2 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginBottom: 15
                      }}
                    >{detail.title}</Text>
                    <Text style={{
                      fontSize: 15,
                      lineHeight: 20,
                      fontWeight: '400'
                    }}>{detail.desc}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      )
    }



    return (
      <View style={styles.card}>
        <FlatList
          data={CategoryCardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          //ItemSeparatorComponent={() => <View style={{ width: SIZES.padding * 2 }} />}
        //contentContainerStyle={{ paddingVertical: SIZES.padding * 3 }}
        />
      </View>
    )
  }





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
      {renderCategoryView()}
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SIZES.padding
  }



})