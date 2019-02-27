import React, { Component } from 'react'
import 'animate.css'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    role: state.user.role
  }
}
@connect(mapStateToProps)
export default class display extends Component {
  componentDidMount(){
    console.log(this.props.role,'rolo')
  }
  render() {
    return (
      this.props.role === 0
      ?
      <div>
        <p>如果是游客，就看不到这张图片</p>
        <img className="animated flip delay-2s" src="https://images.pexels.com/photos/371163/pexels-photo-371163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt=""/>
      </div>
      :
      <div>
        <p>登录为管理员，可获取权限看到不一样的类容</p>
      </div>
    )
  }
}
