import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Sample emojis for memory game
const emojis = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍍", "🥑", "🥕"];

// Shuffle the array
const shuffleArray = (array: string[]) => {
  return array
    .concat(array) // Duplicate emojis to make pairs
    .sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>(shuffleArray(emojis));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  // Handle card tap
  const handleCardPress = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return; // Prevent flipping more than 2 cards at once
    }

    setFlipped([...flipped, index]);

    // Check for a match
    if (flipped.length === 1) {
      const firstIndex = flipped[0];
      if (cards[firstIndex] === cards[index]) {
        setMatched([...matched, firstIndex, index]);
        setFlipped([]);
      } else {
        // Flip back after a short delay
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  // Reset the game
  useEffect(() => {
    if (matched.length === cards.length) {
      Alert.alert("Congratulations!", "You found all pairs!", [
        { text: "Play Again", onPress: () => restartGame() },
      ]);
    }
  }, [matched]);

  const restartGame = () => {
    setCards(shuffleArray(emojis));
    setFlipped([]);
    setMatched([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.grid}>
        {cards.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              { backgroundColor: matched.includes(index) ? "#4CAF50" : "#f8f8f8" },
            ]}
            onPress={() => handleCardPress(index)}
          >
            <Text style={styles.emoji}>
              {flipped.includes(index) || matched.includes(index) ? emoji : "❓"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    width: 300,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  emoji: {
    fontSize: 28,
  },
});
