import { Song } from '../types'

const ITUNES_ENDPOINT =
  'https://itunes.apple.com/search?limit=1&entity=album&term='

export async function getAlbumArtURI(song: Song): Promise<string | null> {
  return new Promise(resolve => {
    if (song.name.length === 0) {
      resolve(null)
      return
    }

    const searchTerm = `${song.artist} ${song.album ? song.album : song.name}`

    fetch(`${ITUNES_ENDPOINT}${encodeURI(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
        if (data?.results?.length > 0) {
          const res = data.results[0]
          resolve(res.artworkUrl100.replace('100x100', '600x600'))
        }
        resolve(null)
        return
      })
  })
}
