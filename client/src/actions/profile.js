import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
    REQUEST_PROFILE,
    GET_PROFILES,
    CLEAR_PROFILE
} from './types'

//get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
       // console.log(res.status)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        })
        
    }
}
//get all user profiles
export const getUserProfiles =() =>async dispatch => {
    dispatch({type: CLEAR_PROFILE });
    try{
        const res= await axios.get('/api/profile/user');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

//get user profile by id
export const getUserProfileById = userId=>async dispatch => {
    dispatch({type: CLEAR_PROFILE });
    try{
        const res= await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

//get all organization profiles
export const getOrganizationProfiles =() =>async dispatch => {
    dispatch({type: CLEAR_PROFILE });
    try{
        const res= await axios.get('/api/profile/organization');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}

//get Organization profile by id
export const getOrganizationProfileById = userId=>async dispatch => {
    dispatch({type: CLEAR_PROFILE });
    try{
        const res= await axios.get(`/api/profile/organization/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        });
    }
}
// create or update a profile
export const createProfile = (formData,edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'

            }
        }

       

        const res = await axios.post('/api/profile',formData, config)

        dispatch({
            type: REQUEST_PROFILE
        })

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created'))
       

       

        
    } catch (err) {
        const errors = err.response.data.errors

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')))
        }
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        })
    }
} 