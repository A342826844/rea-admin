import React, { Component } from 'react'
import moment from 'moment'
import { 
  Table, 
  Tooltip, 
  Icon,
  Button,
  Modal,
  message,
  Card
 } from 'antd';
 
 import XLSX from 'xlsx'

export default class list extends Component {
  columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  }, {
    title: '阅读量',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '添加时间',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (createAt)=>{
      return moment(Number.parseInt(createAt, 10)).format('YYYY-MM-DD h:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Button.Group size='small'>
      <Tooltip placement="top" title="编辑">
        <Button type="primary" onClick={this.handleEdit.bind(this, record.id)}>
          <Icon type="edit" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="删除">
        <Button type="danger" onClick={this.handleDelete.bind(this, record.id, record.title)}>
          <Icon type="delete" />
        </Button>
      </Tooltip>
    </Button.Group>
    ),
  }];

  constructor(){
    super()
    this.state = {
      dataSource: [],
      isLoading: false
    }
  }  
  handleEdit = (id) => {
   console.log("edit")
   this.props.history.push(`/admin/article/edit/${id}`)
  }

  handleDelete = (id, title) => {
    console.log('delete,id')
    Modal.confirm({
      centered:true,
      maskClosable:true,
      okText:'我确定',
      cancelText:'点击错误',
      content:<span>'确认要删除<span style={{color:'#f00',padding:'0 5px'}}>{title}</span>吗？'</span>,
      
      onOk:()=>{
          this.setState({
            isLoading:true
          })
          this.http.deleteArticleById(id)
              .then(resp =>{
                message.success(resp.msg)
                this.fetchArticles()
         })

      }
    })
  }
  
  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    this.http.postArticleList()
      .then(resp => {
        console.log(resp)
        this.setState({
          dataSource: resp,
          isLoading: false
        })
      })
      .catch((err) => {
        this.setState({
          isLoading: false
        })
        console.log(err)
      })
  }


  //导出xlxs
  exportXlsx = () => {
    
    const data = this.state.dataSource.reduce((result, item) => {
      const row = [item.title, item.amount, item.author, item.createAt]
      result.push(row)
      return result
    }, [])
    const title = this.columns.map(item => item.title)
    title.pop()
    data.unshift(title)
    console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "articles.xlsx");
  } 

  componentDidMount(){
    this.fetchArticles()
  }
  
  render() {
    return (
      <Card 
      title="文章标题"
      extra={<Button size="small" type="primary"
       onClick={this.exportXlsx}>
       导出excel</Button>}
      bordered={false}
       >
      <Table 
         loading={this.state.isLoading}
         rowKey={record => record.id}
         dataSource={this.state.dataSource} 
         columns={this.columns} 
         pagination={{
         pageSize:5,
         hideOnSinglePage:true,
         showQuickJumper:true,
   
           }}
           
           />
    </Card>
    )
  }
}
