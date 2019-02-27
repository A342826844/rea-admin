import React, { Component } from 'react'
import moment from 'moment'
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  DatePicker,
  Select ,
  message,
} from 'antd';
const Option = Select.Option;

@Form.create()
export default class add extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.http.pictureAdd(values)
          .then(resp => {
            console.log(resp)
            message.success(resp.msg)
            this.props.history.goBack('/admin/picture/list')
          })
      }
    });
  }
  
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  requiredImage = (e) => {
    console.log(e)
    //TODO: 添加验证
  } 
  beforeUpload =(e) => {
    this.requiredImage(e)
    return false //阻止默认上传
  }
  componentDidMount(){
    this.props.form.setFieldsValue({
      createAt:moment()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
       <Form.Item
        {...formItemLayout}
        label="标题"
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '来一句毒鸡汤!' }],
          })(
            <Input placeholder="来一句毒鸡汤" />
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="图片类型"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: '请选择图片类型', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="请选择图片类型">
              <Option value="美女">美女</Option>
              <Option value="风景">风景</Option>
              <Option value="手绘 ">手绘</Option>
              <Option value="生活">生活</Option>
              <Option value="动漫">动漫</Option>
              <Option value="游戏">游戏</Option>
              <Option value="其他">其他</Option>
            </Select>
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
          label="上传图片"
          extra="支持jpg、png、webp"
        >
          {getFieldDecorator('upload', {
            rules: [{ required: true, message: '请选择图片'}],
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="logo" 
              listType="picture" 
              beforeUpload = {this.beforeUpload}
              >
              <Button>
                <Icon type="upload" /> 点击上传图片
              </Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">上传</Button>
        </Form.Item>
      </Form>
    );
  }
}

