import { type Group } from '@/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let groups: Group[] = require('../../assets/fixtures/groups.json');

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
      <Text style={[styles.text, styles.title]}>TriSum</Text>
      <FlatList
        data={groups}
        renderItem={renderGroup}
        style={styles.groupList}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log('Créer clicked!')}
        >
          <Text style={styles.iconText}>Créer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log('Rejoindre clicked!')}
        >
          <Text style={styles.iconText}>Rejoindre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  description: {
    fontSize: 12,
  },
  groupList: {
    display: 'flex',
    gap: 20,
    marginHorizontal: 25,
  },
  fiche: {
    backgroundColor: '#525252',
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    gap: 10,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20, 
  },
  icon: {
    width: 50,
    height: 50,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#212121',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#525252',
  },
  iconButton: {
    backgroundColor: '#525252',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});