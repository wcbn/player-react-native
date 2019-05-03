import { ReduceStore } from 'flux/utils'
import OnAirDispatcher from './OnAirDispatcher'

class OnAirStore extends ReduceStore {
  constructor() {
    super(OnAirDispatcher)
  }

  getInitialState() {
    return {
      name: '',
      dj: '',
      dj_url: '',
      beginning: '',
      ending: '',
      times: '',
      show_notes: null,
      songs: [{artist: ''}],
      semester_id: -1
    }
  }

  reduce(state, action) {
    console.log(action)

    if (action.data !== undefined) {
      return action.data
    }

    return null
  }
}

export default new OnAirStore()
