import React from 'react'
import { SpotifyPlaylist } from '../interfaces/interfaces'

interface TopPlaylistsProps {
    playlists: SpotifyPlaylist[]
}

export const TopPlaylists: React.FC<TopPlaylistsProps> = ({ playlists }) => {
    return (
        <div className="topPlaylists">
            {playlists.map((playlist, i) => (
                <div key={i} className="playlistIcon">
                    <img
                        className="playlistImage"
                        src={playlist.images[0].url}
                        alt=""
                    />
                    <h5>{playlist.name}</h5>
                </div>
            ))}
        </div>
    )
}
