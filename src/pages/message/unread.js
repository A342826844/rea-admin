import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
   Button,
   List
   } from 'antd';
import { maskNotificationRead } from '../../actions/unread'
const mapState = (state) => {
  return {
    content: state.unread.content
  }
}

@connect(mapState, { maskNotificationRead })
export default class unread extends Component {
  render() {
    return (
      <div>
        通知中心<Button onClick={this.props.hideNotifition}>全部标记为已读</Button>
        <List
          bordered
          dataSource={this.props.content}
          renderItem={item => (<List.Item>
            <span style={{fontWeight: item.hasRead ? 'nomal' : '900'}}>{item.title}</span>
            <button onClick={this.props.maskNotificationRead.bind(this, item.id)}>标记为已读</button>
          </List.Item>)}
        />
      </div>
    )
  }
}
