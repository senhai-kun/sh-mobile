import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import axios from 'axios'
import Loading from '../reusable/Loading'
import AnimeList from '../components/AnimeList'
import PageButton from '../reusable/PageButton'

export default function OngoingList() {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect( () => {
        const c = axios.CancelToken.source();
        axios.get(`https://simplesenhaibookmark.herokuapp.com/api/ongoing/${page}`)
        .then( res => {
            setAnime(res.data.results)
            setLoading(false)
            console.log(res.data.results.length)
        })
        return () => c.cancel("unmount axios request")
    }, [page])
    const nextPage = () => {
        setLoading(true)
        setPage(page+1)
    }
    const prevPage = () => {
        setLoading(true)
        setPage(page-1)
    }

    return loading ? <Loading /> : (
        <ScrollView
            bounces={true}
        >

            <AnimeList anime={anime} component={'popular'} />

            <PageButton currentPage={page} prevPage={prevPage} nextPage={nextPage} />

        </ScrollView>
    )
}