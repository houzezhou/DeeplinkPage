import React from 'react'
import { Input,Button,Form } from 'antd';
import './addapp.css';

const FormItem = Form.Item;

class Addapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var data = new FormData();
        data.append("json", JSON.stringify(values));

        var myHeaders = new Headers({
          'X-Parse-Application-Id': 'deeplink',
          'X-Parse-REST-API-Key': 'f07u39HX6223UE0Pv3mYfsSFY5qNdEZ5',
          'Content-Type': 'application/json'
        });

        var myInit = {
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify(values)
        };

        fetch('http://10.176.30.204:8002/db/classes/App',myInit)
        .then(function(response) {
          //console.log(response)
          return response.json();
        })
        .then(function(json) {
          console.log(json)
        });
      }
    });
  }
  
  render() {

    //const { username, name, QQ, company, phone, dispatch, save } = this.props;  
    const { getFieldDecorator } = this.props.form; 

    return (
      <div style={{marginTop:'100px'}}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label="应用名称 ： " hasFeedback labelCol={{ span: 5 }} wrapperCol={{ span: 10 }}>
            {getFieldDecorator('appName', {
              rules: [{
                required: true, message: 'Please input your app name!',
              }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 2, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Addapp);