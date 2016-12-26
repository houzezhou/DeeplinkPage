import { DatePicker, Icon, Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const { RangePicker } = DatePicker;
import moment from 'moment';

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            app: ['letv','lesport','roman']
        };
    }

    componentDidMount() {
        this.setState({
            username: 'houzezhou'
        });
    }
    
    render(){
    	const ranges = {
    		'上月': [moment().subtract(1,'months').startOf('month'), moment().subtract(1,'months').endOf('month')],
    		'本月': [moment().startOf('month'), moment().endOf('month')], 
    		'最近一周': [moment().day(-5), moment()],
            '最近三天': [moment().day(-1), moment()]
    	}
    	return(
    		<div style={{borderBottom:'1px solid #d9d9d9'}}>
                <span style={{fontSize:'15px'}}> <Icon type="calendar" />  时段选择 ：</span> 
                <RangePicker style={{marginTop:'10px'}}
                  ranges={ ranges }
                />            
                <Menu mode="horizontal" style={{float:'right'}}>              
                    <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
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