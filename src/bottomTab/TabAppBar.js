import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet } from 'react-native';
import { Appbar, Text, TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux';

const TabAppBar = () => {
    const navigation = useNavigation()
    const name = useSelector( state => state.settings.header)
    // console.log(name)

    return (
        <Appbar.Header style={styles.root} >
            <Appbar.Content 
                title={name === 'Home' ? 'Discover' : name} 
                subtitle={name == 'Schedule' ? 'Source: MAL' : null}  
                color={name == 'Home' ? '#BB2A1A' : "#fff"}
            />
            {name == 'Home' && <Appbar.Action size={21} style={styles.icon} icon="magnify" onPress={ () => navigation.navigate("Search")} />}
            {/* {name == 'Home' && <Appbar.Action size={21} style={styles.icon} icon="menu" onPress={ () => navigation.openDrawer()} />} */}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#121212',
    },
    icon: {
        borderColor: 'grey',
        borderWidth: 0.5,
    }
})

export default TabAppBar