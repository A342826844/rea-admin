import React, { Component,Fragment,createRef} from 'react'
import{
  Card,
  Col,
  Row
} from 'antd'

import './newuser.less'

import echarts from 'echarts'

export default class list extends Component {
  constructor (){
    super()
    this.userIncreace = createRef()
  }

  componentDidMount(){
    this.userIncreaceChart = echarts.init(this.userIncreace.current);
    this.userIncreaceChart.setOption({
      legend: {},
      tooltip: {},
      dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
              {product: '第一季度', '2015': 66.3, '2016': 85.8, '2017': 93.7},
              {product: '第二季度', '2015': 53.1, '2016': 73.4, '2017': 88.1},
              {product: '第三季度', '2015': 66.4, '2016': 70.2, '2017': 82.5},
              {product: '第四季度', '2015': 72.4, '2016': 88.9, '2017': 95.1}
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
  },)
  }
  render() {
    return (
      <Fragment>
      <Card
      title="新增用户"
      border={false}
    >
     <div className="sumary">
     <Row>
      <Col className="gutter-row" span={8}>
        <div className="summary-box" style={{backgroundColor:'#00E5FF'}}>总用户：1000</div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div className="summary-box" style={{backgroundColor:'#76FF03'}}>本年新增用户：300</div>
      </Col>
      <Col className="gutter-row" span={8}>
        <div className="summary-box" style={{backgroundColor:'#ff1744'}}>增长率：5%</div>
      </Col>
     </Row>
     </div>

     
       <Row>
         <Col span={12}>
         <Card
           title="用户增长"
           bordered={false}
         >
         <div style={{height:'380px'}} ref={this.userIncreace} >

         </div>
         </Card>
         </Col>
         <Col spam={12}>
         </Col>
       </Row>
  
    </Card>
    </Fragment>
    )
  }
}
