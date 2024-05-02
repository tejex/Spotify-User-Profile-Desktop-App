export interface SpotifyArtist {
    external_urls: {
        spotify: string
    }
    followers: {
        href: string | null
        total: number
    }
    genres: string[]
    href: string
    id: string
    images: {
        height: number
        url: string
        width: number
    }[]
    name: string
    popularity: number
    type: string
    uri: string
}

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
export interface SpotifyPlaylist {
    collaborative: boolean
    description: string
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    images: {
        // Define the structure of image object
        url: string
        height?: number // Optional property
        width?: number // Optional property
    }[]
    name: string
    owner: {
        display_name: string
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        type: string
        uri: string
    }
    primary_color: string | null
    public: boolean
    snapshot_id: string
    tracks: {
        href: string
        total: number
    }
    type: string
    uri: string
}
