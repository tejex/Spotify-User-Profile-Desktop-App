// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

export type Channels = 'ipc-example'

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel: Channels, ...args: unknown[]) {
            ipcRenderer.send(channel, ...args)
        },
        on(channel: Channels, func: (...args: unknown[]) => void) {
            const subscription = (
                _event: IpcRendererEvent,
                ...args: unknown[]
            ) => func(...args)
            ipcRenderer.on(channel, subscription)

            return () => {
                ipcRenderer.removeListener(channel, subscription)
            }
        },

        once(channel: Channels, func: (...args: unknown[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args))
        },
    },
}

const CLIENT_ID = 'ec4827be6c584734b93bdf3a0da374d8'
const CLIENT_SECRET = 'dbd7d7e2f486437baa9997a679d8cf20'

contextBridge.exposeInMainWorld('electronAPI', {
    initiateSpotifyLogin: () =>
        ipcRenderer.send('spotify-login', {
            spotifyClientId: CLIENT_ID,
            spotifySecret: CLIENT_SECRET,
        }),
    retrieveData: () => {
        return ipcRenderer.invoke('send-data')
    },
    backToLoginPage: () => {
        ipcRenderer.invoke('log-out')
    },
})

contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
