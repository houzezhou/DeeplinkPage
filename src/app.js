'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';

// Add react-redux
import {Provider} from 'react-redux';
import configerStore from './configerStore.js'

// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

// 引入单个页面（包括嵌套的子页面）
import Topbar from './containers/topbarC.js';
import myAccount from './containers/accountC.js';
import myPromote from './components/promote/table_promote.js';
import myAnalyze from './components/analyze/table_analyze.js';
import myTable from './components/table/table_promote.js';
import myForm from './components/form.js';
import myProgress from './components/progress.js';
import myCarousel from './components/carousel.js';
import myChart from './components/chart.js';
import myApplist from './containers/applistC.js';
import myAddapp from './containers/addappC.js';
// import myCalendar from './calendar.js';


let routeMap = {
    '/myAccount': '0',
    '/myPromote': '1',
    '/myForm': '2',
    '/myProgress': '3',
    '/myCarousel': '4',
    '/myChart': '5',
    '/myAnalyze': '6',
    '/myApplist': '7',
    '/myAddapp': '8'
};

// 配置导航
class DeeplinkApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            username: 'houzezhou'
        };
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    componentWillMount() {
        var route = this.props.location.pathname;
        //debugger
        this.setState({
            current: routeMap[route] || '0'
        });
    }

    componentDidMount() {
        this.setState({
            username: 'houzezhou'
        });
    }

    render() {

        return (
            <div>
                <div id="leftMenu">
                    <img src='src/images/logo.png' width="50" id="logo"/>
                    <Menu theme="dark"
                        onClick={this.handleClick.bind(this)}
                        style={{ width: 200 }}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >   
                        <SubMenu key="sub1" title={<span><Icon type="bars" /><span>数据中心</span></span>}>
                            <Menu.Item key="1"><Link className="homeleftlink" to="/myChart">概览</Link></Menu.Item>
                            <Menu.Item key="2"><Link className="homeleftlink" to="/myPromote">推广</Link></Menu.Item>
                            <Menu.Item key="3"><Link className="homeleftlink" to="/myAnalyze">分析</Link></Menu.Item>
                            <Menu.Item key="4"><Link className="homeleftlink" to="/myForm">表单</Link></Menu.Item>
                            
                        </SubMenu>

                        <SubMenu key="sub3" title={<span><Icon type="mail" /><span>应用中心</span></span>}>
                            <Menu.Item key="7"><Link to="/myApplist">应用列表</Link></Menu.Item>                           
                            <Menu.Item key="8"><Link to="/myAddapp">创建应用</Link></Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" title={<span><Icon type="mail" /><span>管理中心</span></span>}>
                            <Menu.Item key="5"><Link to="/myAccount">账号管理</Link></Menu.Item>                           
                            <Menu.Item key="6"><Link to="/myTable">编辑表格</Link></Menu.Item>
                            {/*<Menu.Item key="7"><Link to="/myCarousel">轮播</Link></Menu.Item>
                            <Menu.Item key="8"><Link className="homeleftlink" to="/myProgress">进度条</Link></Menu.Item>*/}
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Topbar/>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


// 配置路由
const store = configerStore();
ReactDom.render((
    <Provider store={store}>
        <Router history={hashHistory} >
            <Route path="/" component={DeeplinkApp}>
                <IndexRoute component={myPromote} />
                <Route path="myAccount" component={myAccount} /*onEnter={this.isShowtopBar}*//>
                <Route path="myPromote" component={myPromote} />
                <Route path="myAnalyze" component={myAnalyze} />
                <Route path="myForm" component={myForm} />
                {/*<Route path="myProgress" component={myProgress} />
                <Route path="myCarousel" component={myCarousel} />*/}
                <Route path="myChart" component={myChart} />
                <Route path="myTable" component={myTable} />
                <Route path="myApplist" component={myApplist} />
                <Route path="myAddapp" component={myAddapp} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
