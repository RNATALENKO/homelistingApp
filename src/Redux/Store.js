import {createStore, applyMiddleware, combineReducers} from 'redux';
import {HomeReducer} from './Reducers'; 
import reduxThunk from 'redux-thunk';
import {View} from 'react-native';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AuthReducer} from '../Redux/AuthReducer';

const reducers = combineReducers({HomeReducer, AuthReducer});

export const Store = createStore(reducers, {}, applyMiddleware(reduxThunk));



