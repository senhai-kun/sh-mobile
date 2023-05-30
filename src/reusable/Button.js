import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Button = ({ name, onPress, iconName, direction, disabled, style }) => {
    return(
        <PaperButton
            dark={true}
            color='#2A96D5'
            mode='text'
            style={style}
            icon={() => <Icon name={iconName} size={20} color={disabled ? '#666666' : '#2A96D5' } />}
            onPress={onPress}
            contentStyle={{flexDirection: direction}}
            disabled={disabled}
        >
            {name}
        </PaperButton>
    )
}

export default Button