import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';


//若要使用 bindActionCreators 就要改写dispatch ,就要引入 中间件 redux-thunk,若不实用，则无需引入redux-thunk
export default function configerStore(initialState){
	const store = createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware));
	return store;
}

/*export default function configerStore(initialState){
	const store = createStore(rootReducer,initialState);
	return store;
}*/