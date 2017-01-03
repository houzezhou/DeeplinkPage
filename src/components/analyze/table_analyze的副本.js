import React from 'react';
import {Table,Input,Icon,Button} from 'antd';
import './table_analyze.css';


/* edit */
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (<div>
      {
        editable ?
        <div>
          <Input
            value={value}
            onChange={e => this.handleChange(e)}
          />
        </div>
        :
        <div className="editable-row-text">
          {value.toString() || ' '}
        </div>
      }
    </div>);
  }
}
/* edit */


export default class myTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tDate: [],
            selectedRowKeys: []
        };
    }

    componentDidMount() {
        const data = [];  //23条数据
        for (let i = 0; i < 23; i++) {
            var tdname = (i%2) == 0 ? 'Android' : 'IOS';
            var clicks = Math.ceil(Math.random()*1000);
            var opens = Math.floor(Math.random()*200);
            var activates =Math.ceil(opens/2);
            data.push({
                key: i,
                tdname: tdname,
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

    //edit function form mytable
    renderColumns(data, index, key, text) {
        const editable = false;
        //const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (
            <EditableCell
                editable={false}
                value={text}
                onChange={value => this.handleChange(key, index, value)}
            />
        );
    }
    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
    }
    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }
    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                delete data[index][item].status;
            }
          });
        });
    }
    //edit function form mytable end

    render() {
        const columns = [{
            title: '来源',
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
            title: '深度链接',
            width: '25%',
            dataIndex: 'deeplink',
            render: (text, record, index) => this.renderColumns(this.state.tDate, index, 'title', text),
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
            width: '10%',
            dataIndex: 'operate',
            /*render(text) {
                return (
                    <div>
                        <a href={text} target="_blank"><Button type="primary">分析</Button></a>
                        <Button style={{marginLeft:'10px'}} type="default">编辑</Button>
                    </div>
                )
            }*/
            render: (text, record, index) => {
                const { editable } = false;
                return (<div className="editable-row-operations">
                  {
                    editable ?
                    <span>
                      <a onClick={() => this.editDone(index, 'save')}>Save</a>
                      <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                    :
                    <span>
                      <a onClick={() => this.edit(index)}>Edit</a>
                    </span>
                  }
                </div>);
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
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
        )
    }
}