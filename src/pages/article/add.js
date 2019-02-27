import React, { Component,createRef } from 'react'
import{
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Rate,
  message
}from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import moment from 'moment'

// import { EEXIST } from 'constants';

@Form.create()
export default class edit extends Component {
  constructor(){
    super()
    this.editorRef = createRef()
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createAt: values.createAt.format('x'),
          content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
        console.log('Received values of form: ', data);
        this.http.saveArticle(data)
        .then((resp) => {
          message.success(resp.msg)
          // FIXME: 路由路径错误
          this.props.history.goBack()
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
  }
//设置默认时间
  componentDidMount(){
    this.props.form.setFieldsValue({
      createAt:moment(),
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayoutL = {
      labelCol: { span: 2},
      wrapperCol: { span: 20},
    };
    return (
      <Card 
      title="添加文章"
      bordered={false}
       >
       <Form onSubmit={this.handleSubmit} >

        <Form.Item
        {...formItemLayoutL}
        label="文章标题"
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input placeholder="文章标题" />
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayoutL}
          style={{ marginBottom: 0 }}
        >
          <Form.Item 
            wrapperCol={{span: 20}}
            label="作者"
            style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}>
            {getFieldDecorator('author', {
              rules: [{ required: true, message: '请输入作者' }],
            })(
              <Input placeholder="作者" />
            )}
          </Form.Item>

          <Form.Item
            label="添加时间"
            style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}
          >
            {getFieldDecorator('createAt', {
              rules: [{ required: true, message: '请选择时间' }],
            })(
              <DatePicker showTime format = "YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item
            label="重要性"
            style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}
          >
            {getFieldDecorator('impotent', {
              initialValue: 2.5
            })(
              <Rate allowHalf />
            )}
          </Form.Item>
        </Form.Item>

        <Form.Item
          {...formItemLayoutL}
          label="文章摘要"
        >
          {getFieldDecorator('tabloid')(
            <Input placeholder="文章摘要" />
          )}
        </Form.Item>
          
        <Form.Item
          {...formItemLayoutL}
          label="文章正文"
        >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入正文' }],
          })(
            <Card>
              <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </Card>
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
