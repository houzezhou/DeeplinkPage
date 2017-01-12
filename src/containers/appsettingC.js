import{ bindActionCreators } from 'redux';
import{ connect } from 'react-redux';
import myAppsetting from '../components/appsetting/appsetting.js'

const mapStateToProps = (state) => {
    const{
        username,
        QQ
    } = state.userinfo;

    const{ myappID,myappName } = state;

    return{
        username,
        myappID,
        myappName
    }
}

function save (){
    return function(dispatch){
        dispatch({
            type:'USERINFO',
            name:'wuxin',
            company:'hahahaha'
        })
    }  
}

const mapDispatchToProps = (dispatch) => {
    return{ save: bindActionCreators(save,dispatch),dispatch:dispatch} 
}

export default connect(mapStateToProps,mapDispatchToProps)(myAppsetting);