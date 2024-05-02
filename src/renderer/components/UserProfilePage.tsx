import { useEffect, useState } from 'react'
import {
    getCurrentUserProfile,
    findAccessToken,
    getUserTopArtists,
    getUserPlaylists,
    getTopItems,
} from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectTokens, selectUser, setUser } from '../store/store'
import { TopPlaylists } from './TopPlaylists'
import { TopArtists } from './TopArtists'
import {
    SpotifyArtist,
    UserProfileType,
    SpotifyPlaylist,
} from '../interfaces/interfaces'

export const UserProfile = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null)
    const [topPlaylists, setPlaylists] = useState<SpotifyPlaylist[]>([])
    const [topArtists, setArtists] = useState<SpotifyArtist[]>([])

    const token = useSelector(selectTokens)
    const userData = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCurrentUserProfile(token.tokens.accessToken)
            return data
        }
        const fetchPlaylistData = async () => {
            const playlistData = await getUserPlaylists(
                10,
                token.tokens.accessToken
            )
            return playlistData
        }
        const fetchTopArtistData = async () => {
            const topArtists = await getTopItems(
                5,
                token.tokens.accessToken,
                'artist'
            )
            return topArtists
        }
        const data = fetchData()
        const playlistData = fetchPlaylistData()
        const topArtistData = fetchTopArtistData()

        data.then((res) => {
            dispatch(setUser(res.data))
            setProfile(res.data)
            return
        })
        playlistData.then((res) => {
            setPlaylists(res.data.items)
            return
        })
        topArtistData.then((res) => {
            setArtists(res.data.items)
            return
        })
    }, [])
    console.log(topPlaylists)
    console.log(topArtists)
    return (
        <div className="userProfilePage">
            <div className="profileHeader">
                <img
                    className="profileImage"
                    src={profile?.images[0].url}
                    alt=""
                />
                <div>
                    <h1>Hello {profile?.display_name}</h1>
                    <p>Followers: {profile?.followers.total}</p>
                </div>
            </div>
            <div className="profileInsights">
                <div className="favArtist">
                    <h3>Your Favorite Artists: </h3>
                    <TopArtists artists={topArtists} />
                </div>
                {/* <div className="favTracks">
                    <h3>Your favorite track: </h3>
                    <TopArtists artists={topArtists} />
                </div> */}

                {/* <h3>Your favorite genre: </h3> */}
            </div>
            <div className="playlistInsights">
                <h2>Your Playlists:</h2>
                <TopPlaylists playlists={topPlaylists} />
            </div>
        </div>
    )
}
