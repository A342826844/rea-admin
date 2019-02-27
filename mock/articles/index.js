const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const articleList = ({offset = 0, limited = 10}) => {
  const idStart = 1000 + offset;
  const totalCount = 56;
  const currentPage = offset / limited + 1;
  const isLastPage = currentPage >= totalCount / limited;
  const dataCount = isLastPage && (totalCount%limited !== 0) ? (totalCount%limited) : limited;
  const data = `data|${dataCount}`;
  return Mock.mock({
    "code": 200,
    [data]: [
      {
        "id|+1": idStart,
        "title": "@ctitle(10, 20)",
        "amount": "@integer(100, 1000)",
        "author": "@cname",
        "createAt": "@datetime('T')"
      }
    ],
    isLastPage,
    currentPage,
    totalCount
  })
}

router
  .post('/api/v1/articleList', (req, res) => {
    console.log(req.body)
    res.json(articleList(req.body))
  })
  .post('/api/v1/article/delete/:id', (req, res) => {
    res.json({
      "code": 200,
      "data": {
        "msg": "删除成功信息"
      }
    })
  })
  .post('/api/v1/saveArticle', (req, res) => {
    res.json({
      "code": 200,
      "data": {
        "msg": "添加成功"
      }
    })
  })

module.exports = router
