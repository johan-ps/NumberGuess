import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import Colors from '../constants/colors';
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import BodyTitle from '../components/BodyTitle';
import Title from '../components/Title';
import MainButton from '../components/mainButton';

const GameOverScreen = props => { 
    
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get('window').height);
    const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableHeight(Dimensions.get('window').height);
            setAvailableWidth(Dimensions.get('window').width);
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })
    

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Title style={styles.resultContainer}>Game Over!</Title>
                <View style={styles.imageContainer}>
                    {/* <Image style={styles.image} source={require('../assets/images/success.png')} /> */}
                    <Image 
                        fadeDuration={300} //fadein timer
                        style={styles.image} 
                        source={{uri: 'https://wallpaperaccess.com/full/124823.jpg'}} 
                    />
                </View>
                <BodyTitle style={styles.resultContainer}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> round(s) to guess the 
                    number <Text style={styles.highlight}>{props.userNum}</Text>
                </BodyTitle>
                <MainButton onPress={props.startNewGame}>
                    NEW GAME
                </MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: Dimensions.get('window').height / 30,
        overflow: 'hidden' //an child image that is bigger than the parent, hide it
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60,
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
        fontFamily: 'OpenSans-Bold'
    },
    highlight: {
         color: Colors.primary,
    }
})

export default GameOverScreen;