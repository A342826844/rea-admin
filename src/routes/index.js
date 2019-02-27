import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch,
  Redirect, 
 } from 'react-router-dom';
import { connect } from 'react-redux'
import routesConfig from './config';
import { AppFrame } from '@/components'

const Forbidden = () => {
  return (
    <div>
      <p>你没有权限查看此页面</p>
      <p>可登陆查看</p>
      <p>管理员登陆： 用户名：<b>admin</b>  密码：<b>admin</b></p>
      <p>游客登陆： 用户名：<b>guest</b>  密码：<b>guest</b></p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    role: state.user.role
  }
}
@connect(mapStateToProps)
export default class CRouter extends Component {
  constructor(){
    super()
    this.state = {
      menusPath: '/admin'
    }
  }
  render(){
    return (
      <Router>
          <Switch>
          <Route path={this.state.menusPath} component={() => {
            return(
              <AppFrame>
                <Switch>
                  {
                    routesConfig.menus.map(route => {
                      if(!(route.children)){
                        const path = this.state.menusPath+route.path
                        return (
                          <Route
                            key={route.path}
                            path={path}
                            exact={true}
                            component={route.component}
                          />
                        )
                      } else{
                        return  route.children.map(item => {
                          const path = this.state.menusPath+item.path
                          return (
                            <Route
                              key={path}
                              path={path}
                              exact={true}
                              // component={item.component}
                              render={(props) => {
                                const hasPermission = item.roles.includes(this.props.role)
                                return hasPermission ? <item.component {...props}/> : <Forbidden />
                              }}
                            />
                          )
                        })
                      }
                    })
                  }
                  <Redirect to={this.state.menusPath+routesConfig.menus[0].path} from={this.state.menusPath} exact />
                  <Redirect to='/404' />
                </Switch>
              </AppFrame>
            )
          }}/>
        {
          routesConfig.orters.map(route => {
            const path = route.path
            return (
              <Route
                key={route.path}
                path={path}
                exact={true}
                component={route.component}
                />
                )
          })
        }
        <Route path='/404' component={routesConfig.orters[1].component}/>
        <Redirect to='/admin' from='/' exact />
        <Redirect to='/404' />
      </Switch>
      </Router>
    )
  }
}