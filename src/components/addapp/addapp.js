import React from 'react'
import { Input,Button,Steps,message } from 'antd';
import './addapp.css';

const Step = Steps.Step;

const steps = [{
  title: 'First',
  content: 'First-content',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

//contents
class ContentSteps extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    switch (this.props.title){
      case 'First' :{
        return(
          <div>
            <span>应用名称</span> : <Input size="large" className="ct_input" value={this.props.username}/><br/>
          </div>
        )
      }
      case 'Second' : {
        return(
          <div>
            <span>phone</span> : <Input size="large" className="ct_input" value={this.props.phone}/><br/>
          </div>
        )
      }
      case 'Last' : {
        return(
          <div>
            <span>name</span> : <Input size="large" className="ct_input" value={this.props.name}/><br/>
          </div>
        )
      }
      default : {
        return(
          <div>
            <span>应用名称</span> : <Input size="large" className="ct_input" value={this.props.phone}/><br/>
          </div>
        )
      }
    }
  }
}

export default class Addapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {

    const { current } = this.state;

    const { username, name, QQ, company, phone, dispatch, save } = this.props;

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">

          <ContentSteps title={ steps[this.state.current].title } phone={phone} username={username} name={name}/>
          <br/>
          {steps[this.state.current].content}

        </div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} type="ghost" onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}