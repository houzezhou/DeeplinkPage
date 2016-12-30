import React from 'react'
import { Tabs,Input,Button } from 'antd';

import './account.css'
const TabPane = Tabs.TabPane;

// account center
export default class myAccount extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){

    }
    callback(key) {
        console.log(key);
    }
    render() {
        const { username, name, QQ, company, phone, dispatch, save } = this.props;
        dispatch({
            type: 'TOPBAR',
            isShow: false
        })
        return (
            <div className="card-container">
                <div style={{margin:'20px'}}>账号管理</div>
                <Tabs style={{marginTop:'30px'}} onChange={this.callback} type="card">
                    <TabPane tab="基本信息" key="1">
                        <form>
                            <div className="ctdiv">
                                <span className="ctspan">账号 ：</span><span className="ct_span">{username}</span><br/>
                                <span className="ctspan">邮箱 ：</span><span className="ct_span">{username}</span><br/>

                                <span className="ctspan">电话 ：</span> <Input size="large" className="ct_input" value={phone}/><br/>
                                <span className="ctspan">Q Q ：</span> <Input size="large" className="ct_input" value={QQ} /><br/>
                                <span className="ctspan">姓名 ：</span> <Input size="large" className="ct_input" value={name} /><br/>
                                <span className="ctspan">公司 ：</span> <Input size="large" className="ct_input" value={company} /><br/>
                            </div><br/><br/>
                            <Button type="primary" onClick={save.bind(this)}>Save</Button>
                        </form>
                    </TabPane>
                    <TabPane tab="密码修改" key="2">
                        <form>
                            <div className="ctdiv">
                                <span className="ctspan">旧密码 ：</span> <Input size="large" type="password" className="ct_input"/><br/>
                                <span className="ctspan">新密码 ：</span> <Input size="large" type="password" className="ct_input"/><br/>
                                <span className="ctspan">确认新密码 ：</span> <Input size="large" type="password" className="ct_input"/><br/>
                            </div><br/><br/>
                            <Button type="primary">Save</Button>
                        </form>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}