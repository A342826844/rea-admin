import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  Icon,
  Avatar,
  Timeline,
  List,
  Divider,
  Empty
} from 'antd'
import EchartsProjects from './EchartsProjects'
import EchartsViews from './EchartsViews'
import pic from '../../assets/header.jpg'

const gridStyle = {
  width: '50%',
  height: '50%',
  textAlign: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  display: 'flex',
  alignItems: 'center',
};

const iconType = [
  'picture',
  'user',
  'book',
  'read'
]
const iconColor = [
  '#ff0000',
  '#ffc20e',
  '#009ad6',
  '#130c0e'
]

export default class index extends Component {
  fetchCount(){
    this.http.dashboardCount()
      .then((res) => {
        this.setState({
          count: res
        })
      })
  }
  fetchMessage(){
    this.http.dashboardMessage()
      .then((res) => {
        this.setState({
          message: res
        })
      })
  }
  constructor(){
    super()
    this.state = {
      count: [],
      message: []
    }
  }
  componentDidMount(){
    this.fetchCount()
    this.fetchMessage()
  }
  
  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col md={8}>
            <Card bordered={false}>
              <div>
                <Card bordered={false}>
                  {
                    this.state.count.length === 0 ?
                    <Empty /> :
                    this.state.count.map((item,index) => {
                      return (
                        <Card.Grid style={gridStyle} key={item.id}>
                          <div>
                            <Icon
                              type={iconType[index]}
                              style={{fontSize: '24px',color: iconColor[index]}}
                            />
                          </div>
                          <Card bordered={false} style={{flex: 1}}>
                            <h3>{item.title}</h3>
                            <p>{item.count}</p>
                          </Card>
                        </Card.Grid>
                      )
                    })
                  }
                </Card>
              </div>
            </Card>
          </Col>
          <Col md={16}>
            <Card bordered={false}>
              <EchartsProjects />
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <Row>
                  <Col span={20}>
                    <h3>任务</h3>
                    <small>10个已经完成，2个待完成，1个正在进行中</small>
                  </Col>
                  <Col span={4} ><Icon type="sync" /></Col>
                </Row>
                <Divider />
                <Timeline>
                  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>联调接口</p>
                    <p>功能验收</p>
                  </Timeline.Item>

                  <Timeline.Item color="#108ee9">
                    <p>登录功能设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
              <div className="gutter-box">
                <Card bordered={false}>
                  <Row>
                    <Col span={20}>
                      <h3>消息栏</h3>
                      <small>1条未读消息</small>
                    </Col>
                    <Col span={4} ><Icon type="sync" /></Col>
                  </Row>
                  <Divider />
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.message}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={pic} />}
                          title={<a href="/">{item.author}</a>}
                          description={item.title}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <Row>
                  <Col span={20}>
                    <h3>访问量统计</h3>
                    <small>最近7天用户访问量</small>
                  </Col>
                  <Col span={4} ><Icon type="sync" /></Col>
                </Row>
                <Divider />
                <EchartsViews />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
