import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

const data = [
  { id: 1, name: 'Body Aches', hasStatus: true, icon: require('../assets/images/Body_aches.png') },
  { id: 2, name: 'Bruising or Yellow Skin', hasStatus: true, icon: require('../assets/images/Bruising_or_yellow_skin.png') },
  { id: 3, name: 'Cold Sweat', hasStatus: true, icon: require('../assets/images/Cold_sweat.png') },
  { id: 4, name: 'Diarrhea', hasStatus: true, icon: require('../assets/images/Diarrhea_.png') },
  { id: 5, name: 'Dizziness', hasStatus: true, icon: require('../assets/images/Dizziness_.png') },
  { id: 6, name: 'Fever', hasStatus: true, icon: require('../assets/images/Fever.png') },
  { id: 7, name: 'Headache', hasStatus: true, icon: require('../assets/images/Headache_.png') },
  { id: 8, name: 'Insomnia', hasStatus: true, icon: require('../assets/images/Insomnia_.png') },
  { id: 9, name: 'Itchy Skin', hasStatus: true, icon: require('../assets/images/Itchy_skin.png') },
  { id: 10, name: 'Loss of Appetite', hasStatus: true, icon: require('../assets/images/Loss_of_appetite.png') },
  { id: 11, name: 'Nausea', hasStatus: true, icon: require('../assets/images/Nausea_.png') },
  { id: 12, name: 'Restlessness', hasStatus: true, icon: require('../assets/images/Restlessness_.png') },
  { id: 13, name: 'Skin Rashes', hasStatus: true, icon: require('../assets/images/Skin_rashes.png') },
  { id: 14, name: 'Upset Stomach', hasStatus: true, icon: require('../assets/images/Upset_stomach.png') },
  { id: 15, name: 'Vertigo', hasStatus: true, icon: require('../assets/images/Vertigo_.png') },
  { id: 16, name: 'Vomiting', hasStatus: true, icon: require('../assets/images/Vomiting_.png') },
];

const ListScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item.id)}
      style={selectedItem === item.id ? styles.selectedItem : styles.item}
    >
      <View style={styles.listItem}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.itemName}>{item.name}</Text>
        {item.hasStatus && <Text style={styles.statusIndicator}>Status</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemName: {
    marginLeft: 10,
    fontSize: 18,
  },
  statusIndicator: {
    marginLeft: 'auto',
    color: 'green',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
  },
  selectedItem: {
    backgroundColor: '#a5d6a7',
    padding: 10,
    marginVertical: 5,
  },
});

export default ListScreen;
