import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';

import Colors from '../constants/colors';

const Title = props => {
    return (
        <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
    
    )
}

const styles = StyleSheet.create({
    body: {
        fontFamily: 'OpenSans-Bold'
    }
})

export default Title;