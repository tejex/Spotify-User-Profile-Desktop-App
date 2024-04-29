import { useEffect, useState } from 'react'
import { getCurrentUserProfile, findAccessToken } from '../utils'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectTokens, selectUser, setUser } from '../store/store'

export type UserProfileType = {
    country: string
    display_name: string
    email: string
    followers: {
        total: number
        hfref: null
    }
    href: string
    id: string
    images: [{ url: string; height: number; width: number }]
    product: string
    type: string
    uri: string
}

export const UserProfile = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null)
    const token = useSelector(selectTokens)
    const userData = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCurrentUserProfile(token.tokens.accessToken)
            return data
        }
        const data = fetchData()
        data.then((res) => {
            dispatch(setUser(res.data))
            setProfile(res.data)
            return ''
        })
    }, [])

    return <div>hello {profile?.display_name}</div>
}
