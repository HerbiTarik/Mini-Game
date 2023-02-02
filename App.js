import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
// import { useFonts }  from 'expo-font';
// import AppLoading from 'expo-app-loading';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  // const [fontsLoaded] = useFonts({
  //   'open-sans': require('./assets/fonts/AmaticSC-Regular.ttf'),
  //   'open-sans-bold': require('./assets/fonts/Amatic-Bold.ttf'),
  // });

  // if (!fontsLoaded){
  //   return <AppLoading />;
  // }

  function pickedNumberHandler(e){
    setUserNumber(e);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }

 
  return (
    <>
    <StatusBar style="light" />
    <LinearGradient colors={[ Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
    <ImageBackground source={require('./assets/images/image.webp')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.ImageBackground}>
    <SafeAreaView style={styles.rootScreen}>
    {screen}
    </SafeAreaView>
    </ImageBackground>
    </LinearGradient>
    </>
    );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  ImageBackground: {
    opacity: 0.15
  }
});
