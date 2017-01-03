import{ bindActionCreators } from 'redux';
import{ connect } from 'react-redux';
import Topbar from '../components/topbar/topbar.js'

const mapStateToProps = (state) => {
    const{
        //age,
        username,
        name
    } = state.userinfo;
    const isShow = state.isShow;
    return{
        //age,
        username,
        name,
        isShow
    }
}

function mytest (){
    return function(dispatch){
        dispatch({
            type:'NAME',
            name:'wuxin',
            test:'hahahaha'
        })
    }  
}

const mapDispatchToProps = (dispatch) => {
    return{ myfunction: bindActionCreators(mytest,dispatch) }
    /*return { 
        myfunction : function(){
            dispatch({
                type:'NAME',
                name:'wuxin',
                test:'hahahaha'
            })
        }
    }*/
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Topbar);