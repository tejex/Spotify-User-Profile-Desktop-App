import axios from 'axios'
import { setTokens } from './store/store'
import { timeStamp } from 'console'
import { useDispatch } from 'react-redux'

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
export const getCurrentUserProfile = async (accessToken: string) => {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    axios.defaults.baseURL = 'https://api.spotify.com/v1'
    axios.defaults.headers['Content-Type'] = 'application/json'
    return axios.get('/me')
}
