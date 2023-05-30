import React from 'react'
import { Text as NativeText } from 'react-native-paper'

const Text = (props) => {
    const { children, ...other } = props
    return(
        <NativeText style={[{ fontFamily: 'Open Sans' },{...other}]} >{children}</NativeText>
    )
}

export default Text