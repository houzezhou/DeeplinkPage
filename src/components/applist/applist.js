import React from 'react'
import { Table,Input,Button } from 'antd';

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
        const { username, name, QQ, company, phone, dispatch, save } = this.props;
        return (
            <div>
                applist
            </div>
        )
    }
}