import { ListRenderItem, StyleSheet, View } from 'react-native';

import { type Group } from '@/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, Text } from 'react-native';

let groups: Group[] = require('../../assets/fixtures/groups.json')

export default function HomeScreen() {
  const entertainment = require('@/assets/images/category_icons/entertainment.png');
  const food = require('@/assets/images/category_icons/food.png');
  const transport = require('@/assets/images/category_icons/transport.png');

  const renderGroup: ListRenderItem<Group> = ({item}) => {
    let icon;
    switch(item.category?.title) {
      case 'Transport':
        icon = transport
        break;
      case 'Alimentation': 
        icon = food
        break;
      default:
        icon = entertainment 
    }
    return (
    <View style={styles.fiche} onTouchEnd={() => router.navigate('/(tabs)/group')}>
      <Image style={styles.icon} source={icon} />
      <View>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={[styles.text, styles.description]}>{item.description}</Text>
      </View>
    </View>
  )}
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.text, styles.title]}>
        TriSum
      </Text>
      <FlatList
        data={groups}
        renderItem={renderGroup}
        style={styles.groupList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
    flex:1,
    backgroundColor: "#212121",
  },
  title: {
    fontSize: 30,
    marginBottom: 50
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20
  },
  description: {
    fontSize: 12,
  },
  groupList: {
    display: "flex",
    gap: 20,
    marginHorizontal: 25
  },
  fiche: {
    backgroundColor: "#525252",
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    gap: 10 ,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20, 
  },
  icon: {
    width: 50,
    height: 50
  }
});
