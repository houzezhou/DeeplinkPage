import {createStore} from 'redux';
import rootReducer from './reducers';

export default function configerStore(initialState){
	const store = createStore(rootReducer,initialState);
	return store;
}