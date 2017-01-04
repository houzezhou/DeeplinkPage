import React from 'react';
import {Table,Input,Icon,Button,Modal} from 'antd';
import {Link} from 'react-router';
//import Mymodal from './modal.js';
import './table_promote.css';

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
        name: tdname,
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


export default class myTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            visible: false,
            searchText: ''
        };
    }

    componentDidMount() {      
        this.setState({
            tDate: data
        })
    }

    // checkbox状态
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    //modal
    showModal() {
        this.setState({
          visible: true
        });
    }
    handleOk() {
        this.setState({
          visible: false
        });
    }
    handleCancel() {
        this.setState({
          visible: false
        });
    }

    //筛选部分
    onInputChange(e) {

        this.setState({ searchText: e.target.value });
    }
    onSearch() {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            tDate: data.map((record) => {
            const match = record.name.match(reg);
            if (!match) {
                return null;
            }
            return {
                ...record,
                name: (
                    <span>
                        {record.name.split(reg).map((text, i) => (
                            i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                        ))}
                    </span>
                ),
            };
          }).filter(record => !!record),
        });
    }

    render() {
        var _this = this;
        const columns = [{
            title: '推广名称',
            width: '10%',
            dataIndex: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                  <Input
                    placeholder="Search name"
                    value={this.state.searchText}
                    onChange={this.onInputChange.bind(this)}
                    onPressEnter={this.onSearch.bind(this)}
                  />
                  <Button type="primary" onClick={this.onSearch.bind(this)}>Search</Button>
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
            render(text,index) {
                return (
                  <div>
                    <Link to={{pathname:'/myChart',query:{id:text}}}><Button type="primary">分析</Button></Link>
                    <Button style={{marginLeft:'10px'}} onClick={_this.showModal.bind(_this)} type="default">编辑</Button>
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

        return(
          <div>  
            <Table onClick={this.handleOk} rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} /> 
            

            <Modal title="Modal" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} 
                  okText="OK" cancelText="Cancel">
                <p>Letv ...</p>
                <p>Letv ...</p>
                <p>Letv ...</p>
            </Modal>
          </div>
        )
    }
}