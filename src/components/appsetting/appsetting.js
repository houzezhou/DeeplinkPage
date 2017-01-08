import React from 'react'
import { Input,Button,Upload,Icon,Modal,Popconfirm, message,Collapse } from 'antd';
import './appsetting.css';
import RegistrationForm from './form.js';

//图片上传
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
              <form>
                <span>* Bundle ID</span><br/>
                <Input placeholder="示例 ：aaa.bbb.ccc" /><br/><br/>
                <span>* Apple App Prefix</span><br/>
                <Input placeholder="示例 ：aaa.bbb.ccc" /><br/><br/>
                <span>* Apple App Prefix</span><br/>
                <Input placeholder="示例 ：aaa.bbb.ccc" /><br/><br/>
                <span>* Apple App Prefix</span><br/>
                <Input placeholder="示例 ：aaa.bbb.ccc" /><br/><br/>
              </form>
              </div>
            </Panel>
            
            <Panel header="是否有Android应用？（点击展开）" key="2" style={{marginTop:'20px'}}>
              <div className="AndroidApp">
                <RegistrationForm/>
              </div>
            </Panel>
          </Collapse>


      </div>
    );
  }
}