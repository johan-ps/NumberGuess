import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

//screens
import StartGameScreen from './Screens/startGameScreen';
import GameScreen from './Screens/gameScreen';
import GameOverScreen from './Screens/gameOverScreen';

//custom components
import Header from './components/header';
import Colors from './constants/colors';


function App () {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numRounds => {
    setGuessRounds(numRounds);
  }

  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  } 

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNum={userNumber} startNewGame={configureNewGame} />
  }

  return (
    <View style={styles.mainScreen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  }
});

export default App;
