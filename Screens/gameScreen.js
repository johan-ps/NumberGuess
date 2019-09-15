import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import BodyTitle from '../components/BodyTitle';
import MainButton from '../components/mainButton';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    if (randNum === exclude) {
        return generateRandomBetween (min, max, exclude);
    } else {
        return randNum;
    }
}

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyTitle>#{listLength - itemData.index}</BodyTitle>
            <BodyTitle>{itemData.item}</BodyTitle>
        </View>
    )
}

const renderListItemScroll = (guess, i) => {
    return (
        <View key={i} style={styles.listItem}>
            <BodyTitle>#{i}</BodyTitle>
            <BodyTitle>{guess}</BodyTitle>
        </View>
    )
}

const GameScreen = props => {  
    const initalGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initalGuess);
    const [pastGuesses, setPastGuesses] = useState([initalGuess.toString()]);
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props; // 

    useEffect(() => {
        const updateLayout = () => {
            setAvailableHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuess = direction => {
        if (direction === 'lower' && currentGuess < props.userChoice || direction === 'higher' && currentGuess > props.userChoice) {
            Alert.alert('Dont Lie!', 'You know that you are wrong', [{
                text: 'Sorry!',
                style: 'cancel'
            }]);
            return;
        } 
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        setPastGuesses(curPastGuesses => [nextNum.toString(), ...curPastGuesses])
    }

    if (availableHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyTitle>Opponent's Guess</BodyTitle>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuess.bind(this, 'lower')}>
                            <Icon
                                name="md-remove"
                                color="white"
                                size={24}
                            />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuess.bind(this, 'higher')}>
                            <Icon
                                name="md-add"
                                color="white"
                                size={24}
                            />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={pastGuesses}
                        keyExtractor={item => item}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <BodyTitle>Opponent's Guess</BodyTitle>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuess.bind(this, 'lower')}>
                        <Icon
                            name="md-remove"
                            color="white"
                            size={24}
                        />
                </MainButton>
                <MainButton onPress={nextGuess.bind(this, 'higher')}>
                        <Icon
                            name="md-add"
                            color="white"
                            size={24}
                        />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={pastGuesses}
                    keyExtractor={item => item}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {
                        pastGuesses.map((guess, i) => 
                            renderListItemScroll(guess, pastGuesses.length - i)  
                        )
                    }
                </ScrollView> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20: 5,
        width: 300,
        maxWidth: '80%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: 'grey',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'space-between',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '60%',
        alignItems: 'center'
    }
})

export default GameScreen;