import React from 'react';
import {Input,Icon,Button,Modal} from 'antd';

export default class Mymodal extends React.Component{
	constructor(props) {
		super(props);
    this.state = {
      visible : ''
    }
	}

  componentDidMount(){
    this.setState({
      visible : this.props.visible
    })
  }

	//module框
  showModal() {
    this.setState({
      visible: true
    });
  }
  handleOk() {
    debugger;
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
  		<Modal title="Modal" visible={this.props.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel} 
          okText="OK" cancelText="Cancel">
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
  	)
  }
}