import { DatePicker, Icon, Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const { RangePicker } = DatePicker;
import moment from 'moment';
import './topbar.css';

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'houzezhou',
            app: ['letv','lesport','roman']
        };
    }

    componentDidMount() {
        
    }
    
    render(){

    	const ranges = {
    		'上月': [moment().subtract(1,'months').startOf('month'), moment().subtract(1,'months').endOf('month')],
    		'本月': [moment().startOf('month'), moment().endOf('month')], 
    		'最近一周': [moment().day(-5), moment()],
            '最近三天': [moment().day(-1), moment()]
    	}
        const { isShow, myfunction, username, name } = this.props;
        debugger
    	return(
    		<div onClick={myfunction} className="topbar_box">
                <span style={{fontSize:'15px',display: isShow ? '' : 'none'}}> <Icon type="calendar" />  时段选择 ：</span> 
                <RangePicker style={{marginTop:'10px',display: isShow ? '' : 'none'}}
                  ranges={ ranges }
                />            
                <Menu mode="horizontal" style={{float:'right'}}>              
                    <SubMenu title={<span><Icon type="user" />{ this.props.username }</span>}>
                        <Menu.Item key="setting:1">退出</Menu.Item>
                    </SubMenu>
                    <SubMenu title={<span>{ '切换应用' }</span>}>
                        {
                            this.state.app.map(function(item){
                                return(
                                    <Menu.Item key={item}>{item}</Menu.Item>
                                )
                            })
                        }
                    </SubMenu>   
                </Menu>
                <div style={{clear:'both'}}></div>
            </div>
    	)
    }
}