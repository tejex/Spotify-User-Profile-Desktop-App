import { SpotifyArtist } from '../interfaces/interfaces'

interface TopArtistProps {
    artists: SpotifyArtist[]
}

export const TopArtists: React.FC<TopArtistProps> = ({ artists }) => {
    return (
        <div className="topPlaylists">
            {artists.map((artist, i) => (
                <div key={i} className="playlistIcon">
                    <img
                        className="artistImage"
                        src={artist.images[0].url}
                        alt=""
                    />
                    <h5>{artist.name}</h5>
                </div>
            ))}
        </div>
    )
}
