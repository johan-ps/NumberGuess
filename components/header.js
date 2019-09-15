import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import Title from './Title';

import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={styles.header}>
            <Title style={styles.headerTitle}>{props.title}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: Colors.primary,
        height: 65,
        justifyContent: 'center'
    },
    headerTitle: {
        width: '100%',
        fontSize: 18,
        textAlign: 'center'
    }
})

export default Header;