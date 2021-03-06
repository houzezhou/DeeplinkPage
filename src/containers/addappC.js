import{ bindActionCreators } from 'redux';
import{ connect } from 'react-redux';
import myAddapp from '../components/addapp/addapp.js'

const mapStateToProps = (state) => {
    const{
        username,
        name,
        phone,
        QQ,
        company
    } = state.userinfo;

    return{
        username,
        name,
        phone,
        QQ,
        company
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

export default connect(mapStateToProps,mapDispatchToProps)(myAddapp);