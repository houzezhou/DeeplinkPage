import{ bindActionCreators } from 'redux';
import{ connect } from 'react-redux';
import myApplist from '../components/applist/applist.js'

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
    return{ save: bindActionCreators(save,dispatch),dispatch:dispatch }
    /*return { 
        save : function(){
            dispatch({
                type:'NAME',
                name:'wuxin',
                test:'hahahaha'
            })
        }
    }*/
    
}

export default connect(mapStateToProps,mapDispatchToProps)(myApplist);