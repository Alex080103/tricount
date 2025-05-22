import { Image } from 'expo-image';
import { ListRenderItem, StyleSheet, View, TouchableOpacity } from 'react-native';
import { type Group } from '@/types';
import { FlatList, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

let groups: Group[] = require('../../assets/fixtures/groups.json');

export default function HomeScreen() {
  const renderGroup: ListRenderItem<Group> = ({ item }) => (
    <View style={styles.fiche}>
      <Image style={styles.icon} source={require('@/assets/images/category_icons/food.png')} />
      <View>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={[styles.text, styles.description]}>{item.description}</Text>
      </View>
    </View>
  );

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
          <Ionicons name="create" size={24} color="#007BFF" />
          <Text style={styles.iconText}>Créer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log('Rejoindre clicked!')}
        >
          <AntDesign name="addusergroup" size={24} color="#007BFF" />
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
    borderRadius: 10,
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
    flexDirection: 'column',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});