import React from 'react'
import { Tabs,Input } from 'antd';
import './account.css'
const TabPane = Tabs.TabPane;

// account center
export default class myIntroduce extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){

    }
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <div className="card-container">
                <div style={{margin:'20px'}}>账号管理</div>
                <Tabs style={{marginTop:'30px'}} onChange={this.callback} type="card">
                    <TabPane tab="基本信息" key="1">
                        <div>
                             账号 ： <Input placeholder="Basic usage" />
                        </div>
                    </TabPane>
                    <TabPane tab="密码修改" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </div>
        )
    }
}
