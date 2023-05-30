import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../reusable/Button'

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10,
        marginTop: 10
    }
})

const PageButton = ({ currentPage, prevPage, nextPage }) => {
    return (
        <View style={styles.btnContainer} >
            <Button direction='row' disabled={currentPage == 1 ? true : false} iconName='arrow-back-ios' name='prev' onPress={prevPage} />
                <Text>{currentPage}</Text>
            <Button direction='row-reverse' disabled={false} iconName='arrow-forward-ios' name='next' onPress={nextPage} />
        </View>
    )
}

export default PageButton