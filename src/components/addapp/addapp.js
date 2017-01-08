import React from 'react'
import { Input,Button } from 'antd';
import './addapp.css';

export default class Addapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  
  render() {

    const { username, name, QQ, company, phone, dispatch, save } = this.props;

    return (
      <div className="addContent">
          <span>应用名称 : </span>
          <Input size="large" className="ct_input" placeholder="请输入名称" style={{marginLeft:'18px'}}/>
          <br/><br/><br/><br/>
          <Button type="primary">Save</Button>
          <br/>
      </div>
    );
  }
}