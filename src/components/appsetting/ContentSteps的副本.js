import { Upload, Icon, Modal, Input } from 'antd';


class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [/*{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }*/],
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


export default class ContentSteps extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    switch (this.props.title){
      case 'First' :{
        return(
          <div>
            <span>应用名称 : </span>
            <Input size="large" className="ct_input" value={this.props.username} style={{marginLeft:'18px'}}/><br/>
            <br/>
            <span style={{display:'inline-box',float:'left'}}>应用头像 : </span>
            <div style={{float:'left',marginLeft:'20px'}}>
              <PicturesWall/>
            </div>
            <div style={{clear:'both'}}></div>
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