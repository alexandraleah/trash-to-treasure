// ACTION TYPES
const SET_CENTER = 'SET_CENTER'

//INITIAL STATE

const initialState = {
  center: {
    lat: 42.3539,
    lng: -71.1337,
  },
  zoom: 15,
  located: false,
}
//ACTIONS CREATORS
const setCenter = coords => ({
  type: SET_CENTER,
  coords
})

//THUNK CREATORS
export const LOCATE = () => async dispatch => {
  try {
    // we want to return a category object with topScores on it
    const { data } = await axios.get(`/api/categories/${category.id}`)
    // history.push(`/home/${category.id}`)
    dispatch(setCategory(data))
  } catch (err) { console.error(err) }
}


//set current center on state before navigating to a new page

//set current zoom on state before navigating to a new page
const
