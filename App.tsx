import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/HomeScreen';
import FlappyBird from './src/FlappyBird';
import CoinGame from './src/CoinGame';
import MemoryGame from './src/MemoryGame';
import RockPaperScissors from './src/RockPaperScissors';

// Define the navigation stack types
export type RootStackParamList = {
  Home: undefined;
  FlappyBird: { title: string; description: string };
  CoinGame: undefined;
  MemoryGame: undefined;
  RockPaperScissors: undefined;
};

// Create the Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: backgroundStyle, // ✅ Apply dark mode theme
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FlappyBird" component={FlappyBird} />
        <Stack.Screen name="CoinGame" component={CoinGame} />
        <Stack.Screen name="MemoryGame" component={MemoryGame} />
        <Stack.Screen name="RockPaperScissors" component={RockPaperScissors} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
