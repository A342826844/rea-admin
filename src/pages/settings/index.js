import React, { Component } from 'react'
import { Switch, Card } from 'antd';
import screenfull from 'screenfull'

export default class setting extends Component {

  onChange = (checked) => {
    console.log(`switch to ${checked}`);
    if (screenfull.enabled) {
      checked ? screenfull.request() : screenfull.exit()
    }
  }
  render() {
    return (
      <div>
        <Card title='全屏'><Switch defaultChecked={false} onChange={this.onChange} /></Card>
        <br />
        {/* TODO: antd官网打不开 */}
        {/* <Card title='主题'><Switch defaultChecked={false} onChange={this.onChange} /></Card> */}
      </div>
    )
  }
}
