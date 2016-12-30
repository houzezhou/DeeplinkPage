import React from 'react'
import { Tabs,Input } from 'antd';

import{ bindActionCreators } from 'redux';
import{ connect } from 'react-redux';

import './account.css'
const TabPane = Tabs.TabPane;

// account center
class myIntroduce extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){

    }
    callback(key) {
        console.log(key);
    }
    render() {
        const { username, test, dispatch } = this.props;
        dispatch({
            type: 'TOPBAR',
            isShow: false
        })
        return (
            <div className="card-container">
                <div style={{margin:'20px'}}>账号管理</div>
                <Tabs style={{marginTop:'30px'}} onChange={this.callback} type="card">
                    <TabPane tab="基本信息" key="1">
                        <div>
                             账号 ： <Input placeholder={username} />
                        </div>
                    </TabPane>
                    <TabPane tab="密码修改" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const{
        //age,
        username,
        test
    } = state;

    return{
        //age,
        username,
        test
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
    return{ myfunction: bindActionCreators(mytest,dispatch),dispatch:dispatch }
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

export default connect(mapStateToProps,mapDispatchToProps)(myIntroduce);
