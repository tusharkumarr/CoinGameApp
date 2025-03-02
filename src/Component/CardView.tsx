import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = {
  title: string;
  description: string;
  navigateTo: keyof RootStackParamList;
  navigation: NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;
};

const { width } = Dimensions.get('window'); // ✅ Get screen width

const CardView: React.FC<Props> = ({ title, description, navigateTo, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(navigateTo as any, { title, description } as any)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - 40) / 2, // ✅ Ensure two cards fit in a row with padding
    aspectRatio: 1, // ✅ Keep height proportional for a square shape
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15, // ✅ Adjusted padding
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center', // ✅ Center content
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // ✅ Center text
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center', // ✅ Center text
  },
});

export default CardView;
