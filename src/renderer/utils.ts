import axios from 'axios'
import { UserProfileType } from './interfaces/interfaces'

const LOCALSTORAGE_KEYS = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresIn: 'expiresIn',
    timestamp: 'tokenTimeStamp',
}
//************************************************************************************/
const LOCALSTORAGE_VALUES = {
    accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: localStorage.getItem(LOCALSTORAGE_KEYS.expiresIn),
    timestamp: localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}
//************************************************************************************/
const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES
    if (!accessToken || !timestamp) {
        return false
    }
    const millisecondsElapsed = Date.now() - Number(timestamp)
    return millisecondsElapsed / 1000 > Number(expireTime)
}
//************************************************************************************/
export function findAccessToken() {
    if (
        localStorage.getItem('accessToken') != undefined ||
        localStorage.getItem('accessToken') != ''
    ) {
        return localStorage.getItem('accessToken ')
    }

    return localStorage.getItem('accessToken')
}

export const accessToken = findAccessToken()

//************************************************************************************/
export const logout = () => {
    for (const property in LOCALSTORAGE_KEYS) {
        if (Object.prototype.hasOwnProperty.call(LOCALSTORAGE_KEYS, property)) {
            localStorage.removeItem(
                LOCALSTORAGE_KEYS[property as keyof typeof LOCALSTORAGE_KEYS]
            )
        }
    }
}
//************************************************************************************/
export const generateRandomString = (length: number) => {
    let text = ''
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

//************************************************************************************/
export const tokensTemplate = {
    accessToken: '',
    refreshToken: '',
    expiresIn: '',
}

export const userTemplate = {
    country: '',
    display_name: '',
    email: '',
    followers: {
        total: 0,
        hfref: null,
    },
    href: '',
    id: '',
    images: [{ url: '', height: 0, width: 0 }],
    product: '',
    type: '',
    uri: '',
} as UserProfileType

//************************************************************************************/
export const getCurrentUserProfile = async (accessToken: string) => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    axios.defaults.baseURL = 'https://api.spotify.com/v1'
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.get('/me')
}

export const getUserTopArtists = (
    accessToken: string,
    time_range = 'short_term'
) => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    axios.defaults.baseURL = 'https://api.spotify.com/v1'
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.get(`/me/top/artists?time_range=${time_range}`)
}

export const getUserTopTracks = (
    accessToken: string,
    time_range = 'short_term'
) => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    axios.defaults.baseURL = 'https://api.spotify.com/v1'
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.get(`me/top/tracks?time_range=${time_range}`)
}

export const getUserPlaylists = (limit = 10, accessToken: string) => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    axios.defaults.baseURL = 'https://api.spotify.com/v1'
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.get(`/me/playlists?limit=${limit}`)
}

export const getTopItems = (
    limit = 5,
    accessToken: string,
    type: string,
    time_range = 'short_term'
) => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    axios.defaults.baseURL = 'https://api.spotify.com/v1'
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.get('me/top/artists?time_range=short_term&limit=5')
}
