import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

export default function Search({ anime }) {
    // const search = useSelector( state => state.search.searchResult )
    const navigation = useNavigation()
    return (
        <View style={{ padding: 5 }} >
            <FlatList 
                data={anime}
                numColumns={2}
                keyExtractor={(item) => item.id }
                centerContent
                disableVirtualization
                alwaysBounceVertical={true}
                renderItem={ ({item}) => (
                    <View key={item.id} style={{ flex: 0.5 }} >
                        <TouchableOpacity activeOpacity={0.5} style={{ padding: 4 }} onPress={ () => navigation.navigate('Details', { id: item.id })} >
                        <Image 
                            source={{ uri: item.image }}
                            style={{ height: 220, width: "100%", borderRadius: 5 }}
                        />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }} >{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}