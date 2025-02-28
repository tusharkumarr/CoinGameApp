import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

type Choice = { name: string; emoji: string };

const choices: Choice[] = [
  { name: "Rock", emoji: "✊" },
  { name: "Paper", emoji: "✋" },
  { name: "Scissors", emoji: "✌️" },
];

const getWinner = (player: string, computer: string) => {
  if (player === computer) return "It's a Draw! 😐";
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  ) {
    return "You Win! 🎉";
  }
  return "You Lose! 😢";
};

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState("");
  const fadeAnim = new Animated.Value(0);

  const playGame = (choice: Choice) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerMove = choices[randomIndex];

    setPlayerChoice(choice);
    setComputerChoice(computerMove);
    setResult(getWinner(choice.name, computerMove.name));

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>

      <View style={styles.choiceContainer}>
        <Animated.Text style={[styles.choiceText, { opacity: fadeAnim }]}>
          {playerChoice ? `You: ${playerChoice.emoji}` : "🤔"}
        </Animated.Text>
        <Animated.Text style={[styles.choiceText, { opacity: fadeAnim }]}>
          {computerChoice ? `AI: ${computerChoice.emoji}` : "💻"}
        </Animated.Text>
      </View>

      {result && <Text style={styles.resultText}>{result}</Text>}

      <View style={styles.buttonsContainer}>
        {choices.map((choice) => (
          <TouchableOpacity key={choice.name} style={styles.button} onPress={() => playGame(choice)}>
            <Text style={styles.buttonText}>{choice.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  choiceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  choiceText: {
    fontSize: 40,
    color: "#fff",
  },
  resultText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#61dafb",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default RockPaperScissors;
