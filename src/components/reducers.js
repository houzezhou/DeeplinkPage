const initState = {
	username: 'xiaodi',
	name: 'init_name',
	test: 'init_test'
};

const myReducer = (state = initState,action) => {
	switch (action.type){
		case 'AGE' : {
			return Object.assign({},state,{age: action.age})
		}
		case 'NAME' : {
			return Object.assign({},state,{
				name: action.name,
				test: action.test
			})
		}
		default:
		return state;
	}
}

export default myReducer;