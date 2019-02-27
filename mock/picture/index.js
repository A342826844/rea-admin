const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()
/* const multer = require('multer');
const path = require("path");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../src/assets/upload/"));
    },
    filename: function (req, file, cb) {
        const start = file.originalname.lastIndexOf("."); // 最后一个 . 的位置
        const ext = file.originalname.slice(start); // 从最后一个 . 截取到字符串末尾，作为文件的后缀名
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})
let upload = multer({ storage: storage }); */

let count = 10
let data = `data|${count}`;
const list = () => {
  return Mock.mock({
    code: 200,
    [data]: [
      {
        "id": "@id",
        "title|+1": [
          "等忙完这一阵，就可以接着忙下一阵了",
          "假如生活欺骗了你，不要悲伤，不要心急，反正明天也一样",
          "有时候你不努力一下，你都不知道什么叫绝望",
          "当你觉得自己又丑又穷的时候，不要悲伤，至少你的判断是对的",
          "灰姑娘嫁给了王子，但请不要忘记她也是伯爵的女儿",
          "上帝是公平的，给了你丑的外表，一定会给你低的智商，以免让你显得不协调",
          "你以为有钱人很快乐吗?他们的快乐你根本想象不到",
          "千万不要自己感动自己。大部分人看似的努力，不过是愚蠢导致的",
        ],
        "createAt": "@datetime('T')",
        "img|+1": [
          "https://images.pexels.com/photos/814052/pexels-photo-814052.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/906081/pexels-photo-906081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/790744/pexels-photo-790744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/294173/pexels-photo-294173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/944762/pexels-photo-944762.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/371160/pexels-photo-371160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/371243/pexels-photo-371243.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
          "https://images.pexels.com/photos/371163/pexels-photo-371163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        ]
      }
    ]
  })
}
router
  .post('/api/v1/picture/list', (req, res) => {
    res.json(list())
  })
  .post('/api/v1/picture/add.do', (req, res) => {
    count ++
    data = `data|${count}`
    res.json({
      code: 200,
      data: {
        msg: '添加成功'
      }
    })
  })
module.exports = router