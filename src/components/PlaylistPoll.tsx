import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { fetchPlaylist } from '../redux/actionCreators'
import { POLL_INTERVAL } from '../config'

function PlaylistPoll(props: { children: JSX.Element }) {
  // const dispatch = useDispatch()

  useEffect(() => {
    const pollPlaylist = async () => {
      try {
        // dispatch(fetchPlaylist())
      } catch (error) {
        // ignore
      }
    }

    pollPlaylist()
    const timeout = setInterval(pollPlaylist, POLL_INTERVAL)

    // clean up
    return () => clearInterval(timeout)
  }, [])

  return props.children
}

export default PlaylistPoll
