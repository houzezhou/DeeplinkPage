const initState = {
	username: 'houzezhou@le.com',
	name: 'init_name',
	test: 'init_test',
	isShow: true
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
		case 'TOPBAR' : {
			return Object.assign({},state,{
				isShow: action.isShow
			})
		}
		default:
		return state;
	}
}

export default myReducer;