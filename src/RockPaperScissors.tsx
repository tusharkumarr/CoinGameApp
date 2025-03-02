import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from "react-native";

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
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [findingOpponent, setFindingOpponent] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const playGame = (choice: Choice) => {
    if (findingOpponent) return;

    setLoading(true);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerMove = choices[randomIndex];

      setPlayerChoice(choice);
      setComputerChoice(computerMove);

      const gameResult = getWinner(choice.name, computerMove.name);
      setResult(gameResult);

      // Update scores
      let newPlayerScore = playerScore;
      let newComputerScore = computerScore;

      if (gameResult.includes("Win")) {
        newPlayerScore += 1;
        setPlayerScore(newPlayerScore);
      } else if (gameResult.includes("Lose")) {
        newComputerScore += 1;
        setComputerScore(newComputerScore);
      }

      if (round < 3) {
        setRound((prev) => prev + 1);
      } else {
        // Determine the winner after the third round
        if (newPlayerScore > newComputerScore) {
          setTotalWins((prev) => prev + 1);
        } else if (newComputerScore > newPlayerScore) {
          setTotalLosses((prev) => prev + 1);
        }

        // Start new match
        setFindingOpponent(true);
        setTimeout(() => {
          setPlayerScore(0);
          setComputerScore(0);
          setRound(1);
          setFindingOpponent(false);
        }, 2000);
      }

      setLoading(false);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>

      <View style={styles.matchStats}>
        <Text style={styles.scoreText}>Wins: {totalWins}</Text>
        <Text style={styles.scoreText}>Losses: {totalLosses}</Text>
      </View>

      {findingOpponent ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Finding New Opponent...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.roundText}>Round {round}/3</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>You: {playerScore}</Text>
            <Text style={styles.scoreText}>Opponent: {computerScore}</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFD700" />
              <Text style={styles.loadingText}>Waiting for move...</Text>
            </View>
          ) : (
            <>
              <View style={styles.choiceContainer}>
                <Animated.Text style={[styles.choiceText, { opacity: fadeAnim }]}>
                  {playerChoice ? `You: ${playerChoice.emoji}` : "🤔"}
                </Animated.Text>
                <Animated.Text style={[styles.choiceText, { opacity: fadeAnim }]}>
                  {computerChoice ? `AI: ${computerChoice.emoji}` : "💻"}
                </Animated.Text>
              </View>
              {result && <Text style={styles.resultText}>{result}</Text>}
            </>
          )}

          <View style={styles.buttonsContainer}>
            {choices.map((choice) => (
              <TouchableOpacity key={choice.name} style={styles.button} onPress={() => playGame(choice)} disabled={loading}>
                <Text style={styles.buttonText}>{choice.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
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
  matchStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 10,
  },
  roundText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#FFD700",
    marginTop: 10,
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
