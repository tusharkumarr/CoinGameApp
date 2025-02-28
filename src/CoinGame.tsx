import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const CoinGame = () => {
  const [coins, setCoins] = useState(0);
  const scaleAnim = new Animated.Value(1);

  const handleTap = () => {
    setCoins(coins + 10);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

    function alert(arg0: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.coinText}>Coins: {coins}</Text>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={handleTap}>
          <Text style={styles.buttonText}>Tap to Earn Coins</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={styles.redeemButton} onPress={() => alert(`Redeemed ${coins} coins!`)}>
        <Text style={styles.buttonText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  coinText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  redeemButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
});

export default CoinGame;
