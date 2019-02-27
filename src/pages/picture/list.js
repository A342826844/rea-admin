import React, { Component } from 'react'
import moment from 'moment'
import { 
  Card,
  Row, 
  Col,
  Icon,
  Empty
 } from 'antd';

const { Meta } = Card;

export default class list extends Component {
  constructor(){
    super()
    this.state= {
      dataLists: []
    }
  }
  fetchPictureList(){
    this.http.pictureList()
      .then(res => {
        this.setState({
          dataLists: res
        })
      })
  }
  componentDidMount(){
    this.fetchPictureList()
  }
  render() {
    return (
      <Row type="flex" justify="start">
        {
          this.state.dataLists.length === 0
          ?
          <Col span={22}>
            <Empty />
          </Col>
          :
          this.state.dataLists.map((item) => {
            return (
              <Col 
                key={item.id} 
                span={6}
                style={{marginBottom: "10px"}}
              >
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={item.img} />}
                  actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  >
                  <p style={{height:'80px'}}>{item.title}</p>
                  <Meta
                      description={moment(Number.parseInt(item.createAt, 10)).format('YYYY-MM-DD h:mm:ss')}
                  />
                </Card>
              </Col>
            )
          })
        }
      </Row>
    )
  }
}
