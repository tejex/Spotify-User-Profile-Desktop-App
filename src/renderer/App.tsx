import './App.css'

import { logout } from './utils'
import { UserProfile } from './components/UserProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import { setTokens, selectTokens } from './store/store'

export default function App() {
    const authData = useSelector(selectTokens)
    const dispatch = useDispatch()

    const login = async () => {
        window.electronAPI.initiateSpotifyLogin()
        let tokenData = { accessToken: '', refreshToken: '', expiresIn: '' }

        setTimeout(async () => {
            try {
                tokenData = await window.electronAPI.retrieveData()

                const { accessToken, refreshToken, expiresIn } = tokenData

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('expiresIn', expiresIn)
                localStorage.setItem('tokenTimeStamp', Date.now() + '')

                dispatch(setTokens(tokenData))
            } catch (error) {
                console.error('Error retrieving data:', error)
            }
        }, 1600)
    }

    return (
        <div className="app">
            {!authData || authData.tokens.accessToken == '' ? (
                <div className="homeScreen">
                    <h1 className="header">Spotify User Insights🪄</h1>
                    <button
                        className="loginButton"
                        onClick={() => {
                            login()
                        }}
                        style={{
                            width: 400,
                            height: 60,
                            textTransform: 'none',
                        }}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <>
                    <button
                        className="loginButton"
                        onClick={() => {
                            logout()
                            dispatch(
                                setTokens({
                                    accessToken: '',
                                    refreshToken: '',
                                    expiresIn: '',
                                })
                            )
                        }}
                        style={{
                            width: 400,
                            height: 60,
                            textTransform: 'none',
                        }}
                    >
                        Logout
                    </button>
                    <UserProfile />
                </>
            )}
        </div>
    )
}
