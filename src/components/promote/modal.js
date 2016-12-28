import React from 'react';
import {Input,Icon,Button,Modal} from 'antd';

export default class Mymodal extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
      visible:true
    }
	}

	//module框
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

  render(){
  	return(
  		<Modal title="Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} 
          okText="OK" cancelText="Cancel">
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
  	)
  }
}