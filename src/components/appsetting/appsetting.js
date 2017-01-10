import React from 'react'
import { Input,Button,Upload,Icon,Modal,Popconfirm, message,Collapse,Form,Switch,Tooltip } from 'antd';
import './appsetting.css';
import RegistrationForm from './form.js';

const FormItem = Form.Item;

//图片上传组件
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/upload.do"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
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
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    var obj = this.props.form.getFieldsValue([
      'URI_Scheme', 
      'switch_check', 
      'brow_down_url', 
      'yyb_down_url'
    ]);
    alert(JSON.stringify(obj))
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

          {getFieldDecorator('switch_check', {
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


export default class Appsetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  
  render() {

    const { username, name, QQ, company, phone, dispatch, save } = this.props;

    //Popconfirm部分
    function confirm() {
      message.success('Deleted');
    };
    /*function cancel() {
      message.error('Click on No');
    };*/

    //折叠面板部分
    function callback(key) {
      console.log(key);
    }

    function handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    return (
      <div className="SetContent">
          <div className="appInfo">
            <span>应用名称 : </span>
            <Input size="large" className="ct_input" value={this.props.username}/>
            <br/>
            <br/>

            <span>应用 key : </span>
            <Input size="large" className="ct_input" value={this.props.QQ}/>
            <br/>
            <br/>

            <span style={{display:'inline-box',float:'left'}}>应用头像 : </span>
            <div style={{float:'left',marginLeft:'20px'}}>
              <PicturesWall/>
            </div>
            <div style={{clear:'both'}}></div>
            <div className="Buttonbox">
              <Button type="primary">保存信息</Button>

              <Popconfirm title="Are you sure delete this app?" onConfirm={confirm} okText="Yes" cancelText="No">
                <Button type="default" style={{marginLeft:'50px'}}>删除App</Button>
              </Popconfirm>
              
            </div>
          </div>


          <Collapse defaultActiveKey={['1','2']} onChange={callback} style={{marginTop:'20px'}}>
            <Panel header="是否有IOS应用？（点击展开）" key="1">
              <div className="IOSApp">
                <IOSForm/>
              </div>
            </Panel>
            
            <Panel header="是否有Android应用？（点击展开）" key="2" style={{marginTop:'20px'}}>
              <div className="AndroidApp">
                <IOSForm/>
              </div>
            </Panel>
          </Collapse>


      </div>
    );
  }
}