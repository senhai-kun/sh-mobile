import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { animeTitle } from '../redux/action';
import { searchResult } from '../redux/search/action';
import Button from '../reusable/Button';
import Loading from '../reusable/Loading';
import PageButton from '../reusable/PageButton';
import Search from '../views/Search';
import AnimeList from './AnimeList';
import { baseUrl } from '../settings/baseUrl'

const styles = StyleSheet.create({
    helperText: {
        fontSize: 17.5,
        paddingTop: 5,
        textAlign: 'center'
    },
    noneFoundText: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 20
    },
    hide: {
        display: 'none'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        // marginTop: 50,
        alignContent: 'center',
    },
    btnContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5 
    }
})

export const SearchToolbar = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const titleFromSchedule = useSelector( state => state.settings.animeTitle )

    const [query, setQuery] = useState(titleFromSchedule == '' ? "" : titleFromSchedule)
    const [result, setResult] = useState({})
    const [fetching, setFetching] = useState(titleFromSchedule == '' ? false : true)
    const [page, setPage] = useState(1)

    useEffect( () => {
        fetching &&
        axios.get(`${baseUrl}search/${titleFromSchedule == '' ? query : titleFromSchedule}/${page}`)
            .then( res => {
                console.log('request done')
                // console.log(res.data.results)
                res.data.results.length == 0 ? setResult('none'): setResult(res.data.results)
                setFetching(false)
                dispatch(searchResult(res.data.results))
                // clean up from schedule
                dispatch(animeTitle(''))
            })
            .catch( err => console.log(err.response.status))

        return () => console.log("unmounted search")
    }, [fetching, page])

    const onSubmit = () => {
        console.log("submitted")
        if(query.trim() != "") {
            setFetching(true)
            setPage(1)
            console.log("search is not empty")
        }
    }
    const HelperText = () => {
        return(
            <Text style={ result == 'none' || fetching ?  styles.hide : styles.helperText } >Try to Search Something...</Text> 
        )
    }
    const NotFound = () => {
        return (
            <Text style={ fetching ? styles.hide : styles.noneFoundText} >Title Not Found</Text>
        )
    }
    const OnFetch = () => {
        return (
            <View style={styles.loading} >
                <Text>Loading...</Text>
            </View>
        )
    }
    // console.log(Object.keys(result).length == 0 ? "123" : "asd" )
    return(
        <ScrollView >
            <Searchbar 
                placeholder='Search...'
                icon={ () => <Icon name='arrow-back' color='#fff' size={25} />}
                value={query}
                onChangeText={ (query) => setQuery(query) }
                onSubmitEditing={onSubmit}
                onIconPress={ () => navigation.goBack() }
                autoFocus={titleFromSchedule == '' ? true : false }
            />

            {/* 
                First display helper text then 
                if query is fetching display loading then 
                after fetching display the data last 
                if fetching again remove the last fetched data 
            */}

            { 
                Object.keys(result).length == 0 ? <HelperText /> : 
                fetching ? <Loading /> : 
                result == "none" ? <NotFound /> : 
                <Search anime={result} /> 
            }
            { !fetching ?
                result.length == 20 && 
                <PageButton 
                    currentPage={page} 
                    prevPage={ () => {setPage(page - 1),setFetching(true)} } 
                    nextPage={ () => {setPage(page + 1),setFetching(true)} } 
                /> 
                : 
                null
            }
        </ScrollView>
    )
}