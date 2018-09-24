import { getUserPosition } from '../geoLocationFunctions';

// ACTION TYPES
const SET_CENTER = 'SET_CENTER';
//this action will be created in a different reducer
const CHOOSE_TREASURE = 'CHOOSE_TREASURE';

//INITIAL STATE

const initialState = {
  center: {
    lat: 42.3539,
    lng: -71.1337,
  },
  zoom: 15,
  located: false,
};
//ACTIONS CREATORS
const setCenter = coords => ({
  type: SET_CENTER,
  coords,
});

//THUNK CREATORS
export const locate = () => async dispatch => {
  try {
    userPos = await getUserPosition();
    //not sure if we need this if statement, or if it will just go into the catch block
    //may choose to incorporate getUserPosition directly into this function instead of declaring it in another file and importing and calling it.
    if (userPos) {
      dispatch(setCenter(userPos));
    }
  } catch (err) {
    console.error(err);
  }
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CENTER:
      return { ...state, center: action.coords, located: true };

    default:
      return state;
  }
};

export default reducer;
