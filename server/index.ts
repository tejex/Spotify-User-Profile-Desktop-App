import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import process from 'process'

dotenv.config()

const app = express()

app.use(cors())

const CLIENT_ID = 'ec4827be6c584734b93bdf3a0da374d8'
const REDIRECT_URI = 'http://localhost:1212'

const generateRandomString = (length: number) => {
    let text = ''
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
const stateKey = 'spotify_auth_state'

app.get('/login', function (req, res) {
    const state = generateRandomString(16)
    res.cookie(stateKey, state)

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
    ].join(' ')

    const params = new URLSearchParams()
    params.append('client_id', CLIENT_ID as string)
    params.append('response_type', 'code')
    params.append('redirect_uri', REDIRECT_URI as string)
    params.append('state', state)
    params.append('scope', scope)

    const queryParams = params.toString()

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)

    // console.log('Server is activeeeee')
})

app.listen(5001, () => {
    console.log(`Server is listening on port 5001`)
})
