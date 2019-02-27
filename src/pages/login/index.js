import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
} from 'antd'
import './login.less'

import { doLogin } from '../../actions/user'
const mapState = (state) => {
  return {
    isLogin: state.user.isLogin
  }
}

@connect(mapState,{ doLogin })
class login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.props)
        this.props.doLogin(values)
        this.props.history.push('/admin/dashboard')
      }
    });
  }
  render() {
    const {
      state = {}
    } = this.props.location
    const {
      from = "/admin/dashboard"
    } = state
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
      ?
      <Redirect to={from} />
      :
      <Form onSubmit={this.handleSubmit} className="login-form">
      <h1>夜猫管理系统</h1>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入你的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="admin/guest" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="admin/guest" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <Link to={{pathname: '/register'}}>现在注册!</Link>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(login);


