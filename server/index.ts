// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import { stringify } from 'querystring'
// import { BrowserWindow, ipcRenderer } from 'electron'
// import opener from 'opener'

// dotenv.config()

// const app = express()

// app.use(cors())

// const CLIENT_ID = 'ec4827be6c584734b93bdf3a0da374d8'
// const CLIENT_SECRET = 'dbd7d7e2f486437baa9997a679d8cf20'
// const REDIRECT_URI = 'http://localhost:1212/mainPage'

export const generateRandomString = (length: number) => {
    let text = ''
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

// app.get('/login', function (req, res) {
//     // const state = generateRandomString(16)
//     // var scope = 'user-read-private user-read-email user-top-read'
//     // const options = {
//     //     client_id: CLIENT_ID,
//     //     response_type: 'code',
//     //     redirect_uri: REDIRECT_URI,
//     //     state: state,
//     //     scope: scope,
//     // }
//     // const spotifyUrl = 'https://accounts.spotify.com/authorize?'
//     // const authUrl = spotifyUrl + stringify(options)
//     // opener(authUrl)
// })

// // app.listen(5001, () => {
// //     console.log(`Server is listening on port 5001`)
// // })
