import {createStore, applyMiddleWare,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../_reducers/user.reducers';

const mainReducer = combineReducers({
    user: reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainReducer,composeEnhancers(applyMiddleWare(thunk)));

export default store;