/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path'
import { app, BrowserWindow, shell, ipcMain, protocol } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import MenuBuilder from './menu'
import { resolveHtmlPath } from './util'
import { stringify } from 'querystring'
import { generateRandomString } from '../../server'
import axios from 'axios'
import Store from 'electron-store'
import { ipcRenderer } from 'electron/renderer'

class AppUpdater {
    constructor() {
        log.transports.file.level = 'info'
        autoUpdater.logger = log
        autoUpdater.checkForUpdatesAndNotify()
    }
}

let mainWindow: BrowserWindow | null = null
export const store = new Store()

ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`
    console.log(msgTemplate(arg))
    event.reply('ipc-example', msgTemplate('pong'))
})

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support')
    sourceMapSupport.install()
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

if (isDebug) {
    require('electron-debug')()
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer')
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log)
}

const createWindow = async () => {
    if (isDebug) {
        await installExtensions()
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets')

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths)
    }

    mainWindow = new BrowserWindow({
        show: false,
        width: 1000,
        maxHeight: 800,
        maxWidth: 1000,
        height: 800,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
    })

    mainWindow.loadURL(resolveHtmlPath('index.html'))

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined')
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize()
        } else {
            mainWindow.show()
        }
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    const menuBuilder = new MenuBuilder(mainWindow)
    menuBuilder.buildMenu()

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
    })

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater()
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.setAsDefaultProtocolClient('myapp')
protocol.registerSchemesAsPrivileged([
    {
        scheme: 'oauthdesktop',
        privileges: {
            standard: true,
            secure: true,
        },
    },
])
app.setAsDefaultProtocolClient('oauthdesktop')

const CLIENT_ID = '-'
const CLIENT_SECRET = '-'
const REDIRECT_URI = 'oauthdesktop://callback'

ipcMain.on('spotify-login', (e, arg) => {
    const state = generateRandomString(16)

    var scope = 'user-read-private user-read-email user-top-read'

    const options = {
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    }

    const spotifyUrl = 'https://accounts.spotify.com/authorize?'
    const authUrl = spotifyUrl + stringify(options)
    shell.openExternal(authUrl)
})

ipcMain.handle('log-out', () => {
    return ''
})

let accessToken: string = ''
let refreshToken: string = ''
let expiresIn: string = ''

app.whenReady()
    .then(() => {
        createWindow()

        app.on('activate', () => {
            if (mainWindow === null) createWindow()
        })
        app.on('open-url', async (event, url) => {
            event.preventDefault() // Prevent default behavior

            const urlObj = new URL(url)
            const code = urlObj.searchParams.get('code')

            try {
                const response = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    stringify({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI,
                    }),
                    {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            Authorization: `Basic ${Buffer.from(
                                `${CLIENT_ID}:${CLIENT_SECRET}`
                            ).toString('base64')}`,
                        },
                    }
                )

                if (response.status === 200) {
                    const { access_token, refresh_token, expires_in } =
                        response.data

                    accessToken = access_token
                    refreshToken = refresh_token
                    expiresIn = expires_in
                } else {
                    console.error(
                        'Error retrieving access token:',
                        response.status,
                        response.statusText
                    )
                }
            } catch (error) {
                console.error('Error retrieving access token:', error)
            }
        })

        const sendData = () => {
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: expiresIn,
            }
        }
        ipcMain.handle('send-data', sendData)
    })
    .catch(console.log)
