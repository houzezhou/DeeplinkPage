import React from 'react'
import { Input,Button,Upload,Icon,Modal,Popconfirm, message,Collapse,Form,Switch,Tooltip } from 'antd';
import './appsetting.css';
import RegistrationForm from './form.js';

const FormItem = Form.Item;

var myHeaders = new Headers({
  'X-Parse-Application-Id': 'deeplink',
  'X-Parse-REST-API-Key': 'f07u39HX6223UE0Pv3mYfsSFY5qNdEZ5',
  'Content-Type': 'application/json'
});

//图片上传组件
class Avatar extends React.Component {
  state = {
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="http://10.176.30.204:8002/db/files/h.jpg"
        headers={{
          'X-Parse-Application-Id' : 'deeplink',
          'X-Parse-REST-API-Key' : 'f07u39HX6223UE0Pv3mYfsSFY5qNdEZ5',
          'Content-Type' : 'image/jpeg',
        }}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}

//折叠面板
const Panel = Collapse.Panel;


//IOSForm组件
const IOSForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      switchshow: false,
    };
  },
  componentDidMount(){
    const myappID = this.props.myappID;
    const _this = this;

    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json)
      _this.props.form.setFieldsValue({
        'have_universal' : json.IOS.have_universal,
        'Apple_App_Prefix': json.IOS.Apple_App_Prefix, 
        'Bundle_ID': json.IOS.Bundle_ID,
        'Universal_links': json.IOS.Universal_links,
        'URI_Scheme' : json.IOS.URI_Scheme,
        'brow_down_url' : json.IOS.brow_down_url,
        'yyb_down_url' : json.IOS.yyb_down_url,
      });
      _this.setState({
        switchshow: json.IOS.have_universal
      });
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    const myappID = this.props.myappID;
    const setFieldsValue = this.props.form.setFieldsValue;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.switchshow != true){
          values.have_universal = false;
          setFieldsValue({'Apple_App_Prefix':'', 'Bundle_ID':'', 'Universal_links':''});
          values.Apple_App_Prefix = '';
          values.Bundle_ID = '';
          values.Universal_links = '';
        }
        console.log('Received values of form: ', values);
        var myInit = {
          method: 'PUT',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify({ 'IOS' : values })
        };
        fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
      }
    });
  },
  switchtOnchange(){
    this.setState({
      switchshow: this.state.switchshow ? false : true
    });
  },
  render() {
    const { getFieldDecorator,getFieldProps } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem label="URI Scheme" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('URI_Scheme', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label={(
            <span>
              已经实现 Universal links&nbsp;
              <Tooltip title="Universal Links为iOS官方深度链接标准，仅iOS 9.0以上系统支持，可实现应用间无缝跳转。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )} labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
        >

          {getFieldDecorator('have_universal', {
            valuePropName : 'checked'
          })(
            <Switch onChange={this.switchtOnchange.bind(this)}/>
          )}

        </FormItem>

        <div style={{display:this.state.switchshow ? 'block' : 'none'}}>
          <FormItem label="Bundle ID" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('Bundle_ID', {
              rules: this.state.switchshow ? [{ required: true, message: 'Please input your note!' }] : '',
            })(
              <Input placeholder="示例 ：aaa.bbb.ccc"/>
            )}
          </FormItem>

          <FormItem label="Apple App Prefix" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('Apple_App_Prefix', {
              rules: this.state.switchshow ? [{ required: true, message: 'Please input your note!' }] : '',
            })(
              <Input placeholder="示例 ：aaa.bbb.ccc"/>
            )}
          </FormItem>

          <FormItem label="Universal links" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('Universal_links', {
              rules: this.state.switchshow ? [{ required: true, message: 'Please input your note!' }] : '',
            })(
              <Input placeholder="示例 ：aaa.bbb.ccc"/>
            )}
          </FormItem>
        </div>

        <FormItem label="浏览器下载地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('brow_down_url', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label="应用宝下载地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Input {...getFieldProps('yyb_down_url')} placeholder="示例 ：aaa.bbb.ccc" />
        </FormItem>

        <FormItem wrapperCol={{ span: 2, offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  },
}));

//AndroidForm组件
const AndroidForm = Form.create()(React.createClass({
  /*getInitialState() {
    return {
      switchshow: false,
    };
  },*/
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    var obj = this.props.form.getFieldsValue([
      'URI_Scheme', 
      '别名', 
      '地址',
      'brow_down_url', 
      'yyb_down_url'
    ]);
    alert(JSON.stringify(obj))
  },
  render() {
    const { getFieldDecorator,getFieldProps } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem label="URI Scheme" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('URI_Scheme', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label="package" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('Bundle_ID', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label="Upload" labelCol= {{ span: 5 }} wrapperCol= {{ span: 12 }} extra="请传XXXXX." >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            normalize: function normFile(e) {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            },
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
              <Button type="ghost">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem label="浏览器下载地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('brow_down_url', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label="应用宝下载地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Input {...getFieldProps('yyb_down_url')} placeholder="示例 ：aaa.bbb.ccc" />
        </FormItem>

        <FormItem label="别名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('别名', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label="地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('地址', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 2, offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>

      </Form>
    );
  },
}));


class Appsetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  
  render() {

    const { username, myappID, myappName, dispatch, save } = this.props;
    const{ setFieldsValue } = this.props.form;

    //Popconfirm 删除应用 部分
    function confirm() {

      var myInit = {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      };

      fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        dispatch({
          type: 'MYAPP',
          myappID: '',
          myappName: ''
        })
        setFieldsValue({appName:''});
        console.log(json)
      });

      message.success('Deleted');
    };
    /*function cancel() {
      message.error('Click on No');
    };*/

    //折叠面板部分
    function callback(key) {
      console.log(key);
    }

    function handleSubmitSave(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          var myInit = {
            method: 'PUT',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(values)
          };

          fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
          .then(function(response) {
            //console.log(response)
            return response.json();
          })
          .then(function(json) {
            var myappName = values.appName;
            dispatch({
              type: 'MYAPP',
              myappID: myappID,
              myappName: myappName
            })
            console.log(json)
          });

        }
      });
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="SetContent">
        <div className="appInfo">
          <Form>
            
            <FormItem  label={(<span>应用名称 </span>)} labelCol={{ span: 3 }} wrapperCol={{ span: 10, offset: 1 }}>
              {getFieldDecorator('appName',{
                initialValue: this.props.myappName
              })(
                <Input size="large"/>
              )}
            </FormItem>

            <FormItem  label={(<span>应用 key </span>)} labelCol={{ span: 3 }} wrapperCol={{ span: 10, offset: 1 }}>
                <Input size="large" value={this.props.myappID} disabled/>
            </FormItem>

            <FormItem label="应用头像 " labelCol= {{ span: 3 }} wrapperCol= {{ span: 10, offset: 1 }} extra="点击图片可修改" >            
              <Avatar/>
            </FormItem>

            <div className="Buttonbox">
              <Button type="primary" onClick={handleSubmitSave.bind(this)}>保存信息</Button>

              <Popconfirm title="Are you sure delete this app?" onConfirm={confirm} okText="Yes" cancelText="No">
                <Button type="default" style={{marginLeft:'50px'}}>删除App</Button>
              </Popconfirm>
              
            </div>
          </Form>  
        </div>


        <Collapse defaultActiveKey={['1','2']} onChange={callback} style={{marginTop:'20px'}}>
          <Panel header="是否有IOS应用？（点击展开）" key="1">
            <div className="IOSApp">
              <IOSForm myappID={ myappID }/>
            </div>
          </Panel>
          
          <Panel header="是否有Android应用？（点击展开）" key="2" style={{marginTop:'20px'}}>
            <div className="AndroidApp">
              <AndroidForm/>
            </div>
          </Panel>
        </Collapse>


      </div>
    );
  }
}

export default Form.create()(Appsetting);