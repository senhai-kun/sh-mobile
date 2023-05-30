import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper'
import { useSelector } from 'react-redux';

const GenreAppBar = ({ previous }) => {
    const navigation = useNavigation()
    const genreName = useSelector( i => i.settings.genre )

    return (
        <Appbar.Header style={styles.root} statusBarHeight={0} >
            {previous ? <Appbar.BackAction onPress={ () => navigation.goBack()} /> : null }
            <Appbar.Content title={genreName} />
            {/* {name != 'Genres' && <Appbar.Action icon="magnify" onPress={ () => navigation.navigate("Search")} />} */}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#121212',
    }
})

export default GenreAppBar