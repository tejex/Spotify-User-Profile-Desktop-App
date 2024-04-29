import { ElectronHandler } from '../main/preload'

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        electron: ElectronHandler
        electronAPI: {
            initiateSpotifyLogin: () => void
            retrieveData: () => {
                expiresIn: string
                accessToken: string
                refreshToken: string
            }
            backToLoginPage: () => string
        }
    }
}

export {}
