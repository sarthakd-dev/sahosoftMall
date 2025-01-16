import {userActionTypes} from '../_actions/user.actions.types';
export const changeLoggedIn = (isLoggedIn, user) =>{
    return (dispatch) =>{
    dispatch({
        type : userActionTypes.LOGIN_SUCCESS,
        payload : {isLoggedIn : isLoggedIn, userData : user}
    })
    }
}