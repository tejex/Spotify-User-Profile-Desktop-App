import './App.css'
import { logout } from './utils'
import { UserProfile } from './components/UserProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import { setTokens, selectTokens, setUser } from './store/store'
import { Button } from '@mui/material'
import { tokensTemplate, userTemplate } from './utils'

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
                    <Button
                        className="loginButton"
                        onClick={() => {
                            login()
                        }}
                        style={{
                            width: 400,
                            height: 60,
                            textTransform: 'none',
                            marginLeft: '14%',
                            marginTop: '15%',
                            backgroundColor: 'green',
                        }}
                        variant="contained"
                    >
                        Login
                    </Button>
                </div>
            ) : (
                <div className="currentUserPage">
                    <div className="logoutButton">
                        <Button
                            className="loginButton"
                            onClick={() => {
                                dispatch(setTokens(tokensTemplate))
                                dispatch(setUser(userTemplate))
                                logout()
                            }}
                            style={{
                                width: 200,
                                height: 20,
                                textTransform: 'none',
                                backgroundColor: 'green',
                                color: 'white',
                            }}
                            variant="contained"
                        >
                            Logout
                        </Button>
                    </div>
                    <div className="userProfile">
                        <UserProfile />
                    </div>
                </div>
            )}
        </div>
    )
}
