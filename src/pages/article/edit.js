import React, { Component,createRef } from 'react'
import{
  Card,
  Button,
  Form,
  Input,
  DatePicker
}from 'antd'

import moment from 'moment'

import E from 'wangeditor'

// import { EEXIST } from 'constants';

@Form.create()
export default class edit extends Component {
  constructor(){
    super()
    this.editorRef = createRef()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
//设置默认时间
  componentDidMount(){
    this.props.form.setFieldsValue({
      createAt:moment()
    })
    this.editorE = new E(this.editorRef.current)
    this.editorE.create()
  }

  render() {
   
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Card 
      title="文章标题"
      bordered={false}
       >
       <Form onSubmit={this.handleSubmit} >

        <Form.Item
        {...formItemLayout}
        label="文章标题"
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input placeholder="Username" />
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="作者"
          >
            {getFieldDecorator('author', {
              rules: [
                { required: true,
                   message: '请输入标题作者!'
                   },{
                      min:4,
                      message:'最小需要4位'
                   }
                  ],
            })(
              <Input placeholder="作者" />
            )}
          </Form.Item>

          <Form.Item
          {...formItemLayout}
          label="时间"
          >
            {getFieldDecorator('createAt', {
              rules: [{ required: true, message: '请选择时间' }],
            })(
              <DatePicker showTime format = "YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
          
          <Form.Item
          {...formItemLayout}
          label="正文"
          >
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入正文' }],
            })(
              <div ref={this.editorRef}></div>
            )}
          </Form.Item>

         <Form.Item
          wrapperCol={ {span:18,offset:4}}
         >
         <Button type="primary" htmlType="submit" >
            保存
          </Button>
         </Form.Item>
      </Form>
      
      
    </Card>
    )
  }
}
