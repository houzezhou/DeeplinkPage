import React from 'react';
import {Table,Input,Icon,Button,Modal} from 'antd';
import {Link} from 'react-router';
import Mymodal from './modal.js';
import './table_promote.css';

export default class myTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            visible: false
        };
    }

    componentDidMount() {
        const data = [];  //23条数据
        for (let i = 0; i < 23; i++) {
            var tdname = (i%2) == 0 ? '9.19' : '双十一';
            var comefrom = (i%2) == 0 ? 'weibo' : '微信';
            var tag = (i%4) == 0 ? 'download' : '';
            var clicks = Math.ceil(Math.random()*1000);
            var opens = Math.floor(Math.random()*200);
            var activates =Math.ceil(opens/2);
            data.push({
                key: i,
                tdname: tdname,
                comefrom: comefrom,
                tag: tag,
                deeplink: `http://le.com/DO8IZ`,   //带变量的字符串
                arguments: '{"name":"le","from":"download"}',
                clicks: clicks,
                opens: opens,
                activates: activates,
                createTime: '2016-11-29 11:24:54',
                operate: 'http://m.le.com'
            });
        }

        this.setState({
            tDate: data
        })
    }

    // checkbox状态
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const columns = [{
            title: '推广名称',
            width: '10%',
            dataIndex: 'tdname',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                  <Input
                    placeholder="Search name"
                    value={this.state.searchText}
                    onChange={this.onInputChange}
                    onPressEnter={this.onSearch}
                  />
                  <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible })
        }, {
            title: '渠道',
            dataIndex: 'comefrom'
        }, {
            title: '标签',
            dataIndex: 'tag'
        }, {
            title: '深度链接',
            dataIndex: 'deeplink'
        }, {
            title: '参数',
            width: '25%',
            dataIndex: 'arguments',
        }, {
            title: '点击',
            width: '5%',
            dataIndex: 'clicks',
            sorter: (a, b) => a.clicks - b.clicks
        },{
            title: '打开',
            width: '5%',
            dataIndex: 'opens',
            sorter: (a, b) => a.opens - b.opens
        },{
            title: '激活',
            width: '5%',
            dataIndex: 'activates',
            sorter: (a, b) => a.activates - b.activates
        },{
            title: '创建时间',
            width: '10%',
            dataIndex: 'createTime'
        }, {
            title: '操作',
            width: '15%',
            dataIndex: 'operate',
            render(text) {
                return (
                  <div>
                    <a href={text} target="_blank"><Button type="primary">分析</Button></a>
                    <Button style={{marginLeft:'10px'}} type="default">编辑</Button>
                  </div>  
                )
            }
        }]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (
          <div>  
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} /> 
            <Mymodal isShow/>
          </div>
        )
    }
}