const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const dshboardCount = () => {
  return Mock.mock({
    "code": 200,
    "data|4": [
      {
        "title|+1": [
          "图片",
          "文章",
          "用户",
          "今日阅读量",
        ],
        count: "@integer(100, 1000)",
        id: '@id'
      }
    ]
  })
}

const dashboardMessage = () => {
  return Mock.mock({
    "code": 200,
    "data|4": [
      {
        "author|+1": [
          "韩信",
          "花木兰",
          "墨子",
          "钟无艳",
          "老夫子"
        ],
        "title|+1": [
          "人，总得有个活着的理由",
          "离家太远会忘记故乡，杀人太多会忘掉自己",
          "为了永久的和平，偶尔的战争是必要的",
          "俗说说得好，有钱男子汉，没钱汉子难",
          "有朋友自远方来，不亦乐乎"
        ],
        id: '@id'
      }
    ]
  })
}

router
  .post('/api/v1/dashboard/count', (req, res) => {
    res.json(dshboardCount())
  })
  .post('/api/v1/dashboard/message', (req, res) => {
    res.json(dashboardMessage())
  })


module.exports = router
