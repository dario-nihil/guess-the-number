import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameIsOver from "./screens/GameOverScreen";
import Colors from "./constants/colors";

SplashScreen.preventAutoHideAsync()
  .then((res) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeded: ${res}`)
  )
  .catch(console.warn);

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsover] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // watch for fonts to be loaded, then hide the splash screen
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded) {
      hideSplashScreen();
    }
  }, [fontsLoaded]);

  // Initially return null instead of Apploading />
  if (!fontsLoaded) {
    return null;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsover(false);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  const gameOverHandler = (numberOfRounds) => {
    setGameIsover(true);
    setGuessRounds(numberOfRounds);
  };

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameIsOver
        onStartNewGame={startNewGameHandler}
        roundsNumber={guessRounds}
        userNumber={userNumber}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={[styles.rootScreen, styles.safeAreaContainer]}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  safeAreaContainer: {
    marginTop: 40,
  },
});
