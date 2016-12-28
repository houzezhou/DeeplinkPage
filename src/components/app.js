'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';

// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

// 引入单个页面（包括嵌套的子页面）
import Topbar from './topbar/topbar.js';
import myIntroduce from './introduce.js';
import myPromote from './promote/table_promote.js';
import myAnalyze from './analyze/table_analyze.js';
import myTable from './table/table_promote.js';
import myForm from './form.js';
import myProgress from './progress.js';
import myCarousel from './carousel.js';
import myChart from './chart.js';
// import myCalendar from './calendar.js';


let routeMap = {
    '/myIntroduce': '0',
    '/myPromote': '1',
    '/myForm': '2',
    '/myProgress': '3',
    '/myCarousel': '4',
    '/myChart': '5',
    '/myAnalyze': '6'
};

// 配置导航
class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            username: ''
        };
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    componentWillMount() {
        var route = this.props.location.pathname;
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
                        defaultOpenKeys={['sub1', 'sub2']}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >   
                        <SubMenu key="sub1" title={<span><Icon type="bars" /><span>主导航</span></span>}>
                            <Menu.Item key="1"><Link className="homeleftlink" to="/myChart">概览</Link></Menu.Item>
                            <Menu.Item key="2"><Link className="homeleftlink" to="/myPromote">推广</Link></Menu.Item>
                            <Menu.Item key="3"><Link className="homeleftlink" to="/myAnalyze">分析</Link></Menu.Item>
                            <Menu.Item key="4"><Link className="homeleftlink" to="/myForm">表单</Link></Menu.Item>
                            <Menu.Item key="5"><Link className="homeleftlink" to="/myProgress">进度条</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="mail" /><span>导航一</span></span>}>
                            <Menu.Item key="6"><Link to="/myIntroduce">Font</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/myCarousel">轮播</Link></Menu.Item>
                            <Menu.Item key="8"><Link to="/myTable">筛选表格</Link></Menu.Item>
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
ReactDom.render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <IndexRoute component={myIntroduce} />
            <Route path="myIntroduce" component={myIntroduce} />
            <Route path="myPromote" component={myPromote} />
            <Route path="myAnalyze" component={myAnalyze} />
            <Route path="myForm" component={myForm} />
            <Route path="myProgress" component={myProgress} />
            <Route path="myCarousel" component={myCarousel} />
            <Route path="myChart" component={myChart} />
            <Route path="myTable" component={myTable} />
        </Route>
    </Router>
), document.getElementById('app'));
