import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CardView from './Component/CardView';
import { RootStackParamList } from '../App';
import AdsManager from './Component/AdsManager'; // ✅ Import AdsManager

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const cards: { title: string; description: string; navigateTo: keyof RootStackParamList }[] = [
    { title: "Flappy Bird", description: "Fun with bird and pipe", navigateTo: "FlappyBird" },
    { title: "Coin Game", description: "Add coin in your wallet", navigateTo: "CoinGame" },
    { title: "Memory Game", description: "Check your memory", navigateTo: "MemoryGame" },
    { title: "Rock Paper Scissors", description: "Rock Paper Scissors", navigateTo: "RockPaperScissors" },
  ];

  return (
    <View style={styles.container}>
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

      {/* ✅ Banner Ad at the Bottom */}
      <AdsManager />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
