const userinfo = {
	username: 'houzezhou@le.com',
	name: 'houzezhou',
	phone: '15787690987',
	QQ: '8376898',
	company: 'Leeco'
}
const initState = {
	userinfo: userinfo,
	isShow: true,
	myappID: 'twc1NMzf5k',
	myappName: '安安'
};

const myReducer = (state = initState,action) => {
	switch (action.type){
		case 'USERINFO' : {
			var userinfo = Object.assign({}, state.userinfo, {
				username: action.username || state.userinfo.username,
				name: action.name || state.userinfo.name,
				phone: action.phone || state.userinfo.phone,
				QQ: action.QQ || state.userinfo.QQ,
				company: action.company || state.userinfo.company
			})
			return Object.assign({},state,{
				userinfo
			})
		}
		case 'TOPBAR' : {
			return Object.assign({},state,{
				isShow: action.isShow
			})
		}
		case 'MYAPP' : {
			return Object.assign({},state,{
				myappID: action.myappID,
				myappName: action.myappName
			})
		}
		default:
		return state;
	}
}

export default myReducer;