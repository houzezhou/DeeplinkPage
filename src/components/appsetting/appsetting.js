import React from 'react'
import { Input,Button,Upload,Icon,Modal,Popconfirm, message,Collapse,Form,Switch,Tooltip } from 'antd';
import './appsetting.css';
import RegistrationForm from './form.js';
import customRequest from './customRequest.js';

const FormItem = Form.Item;

var myHeaders = new Headers({
  'X-Parse-Application-Id': 'deeplink',
  'X-Parse-REST-API-Key': 'f07u39HX6223UE0Pv3mYfsSFY5qNdEZ5',
  'Content-Type': 'application/json'
});
var __upload_resUrl, __upload_resApk;

//图片上传组件
class Avatar extends React.Component {
  componentWillMount = ()=>{
    const myappID = this.props.myappID;
    const _this = this;
    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };
    //进入页面，请求IOS数据，填充内容
    fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      __upload_resUrl = json.imageUrl;
      if(__upload_resUrl){
        _this.setState({imageUrl:__upload_resUrl})
      }

    });
  }

  state = {
    imageUrl:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info,'dd')
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      __upload_resUrl = info.file.response.url;
    }
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!');
    }
    return isJPG && isLt1M;
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="http://10.176.30.204:8002/db/files/pic.jpg"
        headers={{
          'X-Parse-Application-Id' : 'deeplink',
          'X-Parse-REST-API-Key' : 'f07u39HX6223UE0Pv3mYfsSFY5qNdEZ5',
          'Content-Type' : 'image/jpeg',
        }}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        customRequest={customRequest}
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
    //进入页面，请求IOS数据，填充内容
    fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json)
      _this.props.form.setFieldsValue({
        'have_universal' : json.IOS.have_universal ? json.IOS.have_universal : '',
        'Apple_App_Prefix': json.IOS.Apple_App_Prefix ? json.IOS.Apple_App_Prefix : '',
        'Bundle_ID': json.IOS.Bundle_ID ? json.IOS.Bundle_ID : '',
        'Universal_links': json.IOS.Universal_links ? json.IOS.Universal_links : '',
        'URI_Scheme' : json.IOS.URI_Scheme ? json.IOS.URI_Scheme : '',
        'brow_down_url' : json.IOS.brow_down_url ? json.IOS.brow_down_url : '',
        'yyb_down_url' : json.IOS.yyb_down_url ? json.IOS.yyb_down_url : '',
      });
      _this.setState({
        switchshow: json.IOS.have_universal
      });
    });
  },
  //提交IOS表单数据
  handleSubmit_IOS(e) {
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
      <Form onSubmit={this.handleSubmit_IOS}>
        
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


let uuid = 0;
//AndroidForm组件
const AndroidForm = Form.create()(React.createClass({

  /******点击添加自定义 input******/
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  },

  remove(k) {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  },

  add() {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  },
  /******点击添加自定义 input******/


  componentDidMount(){
    const myappID = this.props.myappID;
    const _this = this;

    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };
    //进入页面，请求安卓数据，填充内容
    fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json)

      var URI_Scheme = json.Android.URI_Scheme,
          upload_apk = json.Android.upload_apk,
          Bundle_ID = json.Android.Bundle_ID,
          brow_down_url = json.Android.brow_down_url,
          yyb_down_url = json.Android.yyb_down_url;

      _this.props.form.setFieldsValue({
        'URI_Scheme' : URI_Scheme ? URI_Scheme : '',
        'upload_apk': upload_apk ? upload_apk : '',
        'Bundle_ID': Bundle_ID ? Bundle_ID : '',
        'brow_down_url' : brow_down_url ? brow_down_url : '',
        'yyb_down_url' : yyb_down_url ? yyb_down_url : '',
      });
    });
  },
  handleSubmit_Android(e) {
    e.preventDefault();
    const myappID = this.props.myappID;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        delete values.upload_apk;
        if(__upload_resApk){
          values.apkUrl = __upload_resApk;
        }
        console.log('Received values of form: ', values);
        var myInit = {
          method: 'PUT',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify({ 'Android' : values })
        }
        //提交安卓表单
        fetch('http://10.176.30.204:8002/db/classes/App/'+ myappID, myInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          console.log(json)
        });
        
      }
    });
  },
  handleUpload(info){
    if (info.file.status === 'done') {
      //Only to show one recent uploaded files, and old ones will be replaced by the new
      /*let fileList = info.fileList;
      fileList = fileList.slice(-1);*/
      __upload_resApk = info.file.response.url;
    }
  },
  render() {
    const { getFieldDecorator,getFieldProps,getFieldValue } = this.props.form;

    /******点击添加自定义 input render里 定义变量******/
    //getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    debugger
    const formItems = keys.map((k, index) => {
      if(index>0){
        return (
          <div key={k}>
          <FormItem
            label="别名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
            required={false}
          >
            {getFieldDecorator(`names-${k}`, {
              validateTrigger: ['onChange', 'onBlur']
            })(
              <Input placeholder="passenger name"/>
            )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          </FormItem>
          
          <FormItem
            label="地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}
            required={false}
          >
            {getFieldDecorator(`names-${k}`, {
              validateTrigger: ['onChange', 'onBlur']
            })(
              <Input placeholder="passenger name"/>
            )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          </FormItem>
          </div>
        );      
      }

    });
    /******点击添加自定义 input render里 定义变量******/

    return (
      <Form onSubmit={this.handleSubmit_Android}>
        
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
          {getFieldDecorator('upload_apk', {
            valuePropName: 'fileList',
            normalize: function normFile(e) {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            },
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Upload
              name="upload_apk"
              showUploadList={true}
              action="http://10.176.30.204:8002/db/files/le.apk"
              headers={{
                'X-Parse-Application-Id' : 'deeplink',
                'X-Parse-REST-API-Key' : 'f07u39HX6223UE0Pv3mYfsSFY5qNdEZ5',
                'Content-Type' : 'image/jpeg',
              }}
              onChange={this.handleUpload.bind(this)}
              customRequest={customRequest}
            >
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

        {/*<FormItem label="别名" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('别名')(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>

        <FormItem label="地址" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          {getFieldDecorator('地址')(
            <Input placeholder="示例 ：aaa.bbb.ccc"/>
          )}
        </FormItem>*/}

        {/***************点击添加自定义input****************/}
        {formItems}
        <FormItem label="添加自定义下载" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        {/***************点击添加自定义input****************/}

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
          if(__upload_resUrl){
            values.imageUrl = __upload_resUrl;
          }
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
              <Avatar myappID={myappID}/>
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
              <AndroidForm myappID={ myappID }/>
            </div>
          </Panel>
        </Collapse>


      </div>
    );
  }
}

export default Form.create()(Appsetting);