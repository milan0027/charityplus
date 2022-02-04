import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, REQUEST_PROFILE } from "../actions/types"

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
    request_profile: false   
}

function profile(state=initialState, action) {
    const { type, payload} = action

    switch(type) {

        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                request_profile: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
               ...state,
               profile: null,
               repos:[],
               loading: false 
            }
        case REQUEST_PROFILE:
            return {
                    ...state,
                    request_profile: true
                    
                }
        default: 
        return state

    }
}

export default profile