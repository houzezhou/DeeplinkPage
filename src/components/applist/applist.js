import React from 'react'
import { Table,Button } from 'antd';

import './applist.css'

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

        const columns = [{
          title: '应用名',
          dataIndex: 'name',
          render: text => <a href="#">{text}</a>,
        }, {
          title: '创建账号',
          dataIndex: 'account',
        }, {
          title: '创建时间',
          dataIndex: 'time',
        }, {
            title: '操作',
            dataIndex: 'handle',
            render: function(text){
                return <Button>{text}</Button>
            }
        }];

        const data = [{
          key: '1',
          name: 'letv',
          account: 'houzezhou@le.com',
          time: '2017/1/1',
          handle: '操作'
        }, {
          key: '2',
          name: 'lesport',
          account: '23425252@qq.com',
          time: '2017/1/1',
          handle: '操作'
        }, {
          key: '3',
          name: 'Black',
          account: 'leops@man.com',
          time: '2017/1/1',
          handle: '操作'
        }, {
          key: '4',
          name: 'test',
          account: 'lalala.le.com',
          time: '2017/1/1',
          handle: '操作'
        }];

        const pagination = {
          total: data.length,
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => {
            console.log('Current: ', current, '; PageSize: ', pageSize);
          },
          onChange: (current) => {
            console.log('Current: ', current);
          },
        };


        const { username, name, QQ, company, phone, dispatch, save } = this.props;
        return (
            <div>
                <Button type="primary">add new</Button><br/><br/>
                <Table columns={columns} dataSource={data} pagination={pagination} bordered
    title={() => <div style={{textAlign:'center'}}>Applist</div>}
    footer={() => 'Footer'}/>
            </div>
        )
    }
}