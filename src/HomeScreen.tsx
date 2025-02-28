import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CardView from './Component/CardView';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const cards: { title: string; description: string; navigateTo: keyof RootStackParamList }[] = [
    { title: "Flappy Bird", description: "Fun with bird and pipe", navigateTo: "FlappyBird" },
    { title: "Coin Game", description: "Add coin in your wallet", navigateTo: "CoinGame" },
    { title: "Memory Game", description: "Check your memory", navigateTo: "MemoryGame" },
    { title: "Rock Paper Scissors", description: "Rock Paper Scissors", navigateTo: "RockPaperScissors" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.gridContainer}>
        {cards.map((card, index) => (
          <CardView
            key={index}
            title={card.title}
            description={card.description}
            navigation={navigation} // ✅ Pass navigation
            navigateTo={card.navigateTo} // ✅ Pass navigation target
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center', // Keep cards centered horizontally
      paddingTop: 50, // Add some spacing from the top
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'flex-start', // ✅ Align items to the top
      width: '100%', // Ensure it takes the full width
      paddingHorizontal: 10, // Add some padding for spacing
    },
  });
  

export default HomeScreen;
