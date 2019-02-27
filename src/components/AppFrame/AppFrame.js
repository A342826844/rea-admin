import React, { Component } from 'react'

import routesConfig from '@/routes/config';
import { Redirect } from 'react-router-dom'

import {
  Layout,
  Dropdown,
  Menu,
  Icon,
  Row,
  Col,
  Avatar,
  Badge
} from 'antd';
import logo from '../../assets/logo.png'
import logo1 from '../../assets/header.jpg'
import './AppFrame.less'
import{
  withRouter,
  Link
}from 'react-router-dom'

import {connect} from 'react-redux'
import {logout} from '../../actions/user'
const mapState = state => {
  return {
    hasUnreadNotification:state.unread.content.some(item => item.hasRead === false),
    unreadNotificationCount:state.unread.content.filter(item => item.hasRead === false).length,
    displayUsername: state.user.displayName,
    isLogin: state.user.isLogin,
  }
}

const { SubMenu } = Menu;
const {
  Header,
  Content,
  Sider
} = Layout;

const meanItem = routesConfig.menus

@connect(mapState,{logout})
class AppFrame extends Component {
  constructor(){
    super()
    this.state={
      defaultSelectedKey:''
    }
  }
  componentDidMount(){
    console.log(this.props.location,'11111111')
    this.setState({
      defaultSelectedKey : `${this.props.location.pathname.split('/').slice(2).join('/')}`
    })
  }
  handleMenuClick = ({key})=>{
    const {
        history,
        match
    } = this.props
    console.log(key)
    history.push(`${match.path}${key}`)
  }
  doLogout = () => {
    this.props.logout()
    this.props.history.push('/login')
    window.sessionStorage.removeItem('userInfo')
  }
  render() {
    const locationPathname = this.props.location.pathname.split('/').slice(2).join('/')
    const defaultSelectedKey = locationPathname ? locationPathname : 'dashboard'
    const defaultOpenKey = defaultSelectedKey.split('/')[0]
    console.log(defaultOpenKey)
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Badge count={this.props.unreadNotificationCount}>
            <Link to="/admin/message/unread">通知中心</Link>
          </Badge>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <Link to="/">个人中心</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.doLogout}>
          退出
        </Menu.Item>
      </Menu>
    )
    return (
      !(this.props.isLogin)
      ?
      <Redirect to={{
        pathname: '/login',
        state: {
          from: this.props.location.pathname
        }
      }} />
      :
      <Layout>
      <Header className="header">
        <Row>
          <Col span={18}>
            <div className="logo">
              <div style={{color: "#fff"}}>
              <img src={logo} alt=""/>
              </div>
            </div>
          </Col>
          <Col span={6} style={{textAlign: 'right'}}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Badge dot={this.props.hasUnreadNotification}>
                <span style={{marginRight:'10px'}}>{this.props.displayUsername}</span>
                <Avatar src={logo1} />
              </Badge>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[`/${defaultSelectedKey}`]}
              defaultOpenKeys={[`/${defaultOpenKey}`]}
              style={{ height: '100%' }} 
              onClick={this.handleMenuClick}
            >
              {
                meanItem.map( item => {
                  if(!(item.children)){
                    return (
                      <Menu.Item 
                        key={item.path}>
                        <Icon type="user" />
                        <span className="nav-text">{item.title}</span>
                      </Menu.Item>
                    )
                  } else{
                    return (
                      <SubMenu key={item.path} title={<span><Icon type="laptop" />{item.title}</span>}>
                        {
                          item.children.map( item => {
                            return(
                              <Menu.Item key={item.path}>{item.title}</Menu.Item>
                            )
                          })
                        }
                      </SubMenu>
                    )
                  }
                })
              }
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
    )
  }
}

export default withRouter(AppFrame)
