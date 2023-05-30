import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import axios from 'axios'
import AnimeList from '../components/AnimeList'
import Loading from '../reusable/Loading'
import PageButton from '../reusable/PageButton'
import { baseUrl } from '../settings/baseUrl'

export default function RecentAddedList() {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    useEffect( () => {
        const c = axios.CancelToken.source();
        axios.get(`${baseUrl}recentlyadded/${page}`)
        .then( res => {
            setAnime(res.data.results)
            setLoading(false)
        })
        return () => c.cancel('unmounted')
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
        <ScrollView>
            
            <AnimeList anime={anime} component={'recentlyadded'} />
            
            <PageButton currentPage={page} prevPage={prevPage} nextPage={nextPage} />

        </ScrollView>
    )
}