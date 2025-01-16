import { userActionTypes } from "../_actions/user.actions.types";
const istate = {
    loggedIn : false,
    userDetails:{},

}

 const reducer = ( state = istate, action) => {
if(action.type === userActionTypes.LOGIN_SUCCESS){
    return {
        loggedIn : action.payload.isLoggedIn,
        userDetails: action.payload.userData
    }
}
return state
}

export default reducer;