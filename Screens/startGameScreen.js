import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from '../components/card';
import Colors from '../constants/colors';
import Input from '../components/input';
import NumberContainer from '../components/numberContainer';
import BodyTitle from '../components/BodyTitle';
import Title from '../components/Title';
import MainButton from '../components/mainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [guessValue, setGuessValue] = useState(null);
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInput = () => {
        setEnteredValue('');
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    const confirmInput = () => {
        const chosenNum = parseInt(enteredValue)
        if (!isNaN(chosenNum) && chosenNum > 0 && chosenNum <= 99) {
            setConfirmed(true);
            setGuessValue(chosenNum);
            Keyboard.dismiss();
        } else {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{
                text: 'Ok',
                style: 'destructive',
                onPress: resetInput
            }])
        }
    }

    let confirmedOutput = null;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summeryContainer}>
                <BodyTitle>You Selected</BodyTitle>
                <NumberContainer>{guessValue}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(guessValue)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset="30">
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.mainView}>
                        <Title style={styles.title}>Start a New Game!</Title>
                        <Card style={styles.inputContainer}>
                            <BodyTitle style={styles.message}>Select a number</BodyTitle>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                keyboardType="number-pad" 
                                maxLength={2} 
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button 
                                        style={styles.resetButton} 
                                        title="RESET" 
                                        color={Colors.accent} 
                                        onPress={resetInput}
                                    />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button 
                                        style={styles.confirmButton} 
                                        title="CONFIRM" 
                                        color={Colors.primary} 
                                        onPress={confirmInput}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'OpenSans-Bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    // button: {
    //     width: Dimensions.get('window').width / 4
    // },
    message: {
        fontSize: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summeryContainer: {
        marginTop: 30,
        alignItems: 'center'
    }
})

export default StartGameScreen;