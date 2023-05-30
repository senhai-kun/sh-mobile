import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import axios from 'axios'
import List from './List'
import Loading from '../../reusable/Loading'

export const Monday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/monday`)
            .then(res => {
                setAnime(res.data.monday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])
    
    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}
export const Tuesday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/tuesday`)
            .then(res => {
                setAnime(res.data.tuesday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])

    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}
export const Wednesday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/wednesday`)
            .then(res => {
                setAnime(res.data.wednesday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])
    
    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}
export const Thursday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/thursday`)
            .then(res => {
                setAnime(res.data.thursday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])
    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}
export const Friday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/friday`)
            .then(res => {
                setAnime(res.data.friday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])
    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}
export const Saturday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/saturday`)
            .then(res => {
                setAnime(res.data.saturday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])
    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}
export const Sunday = () => {
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const c = axios.CancelToken.source()
        axios.get(`https://api.jikan.moe/v3/schedule/sunday`)
            .then(res => {
                setAnime(res.data.sunday)
                setLoading(false)
            })
        return () => c.cancel('cancel after fetch')
    }, [])
    
    return loading ? <Loading /> : (
        <List anime={anime} />
    )
}