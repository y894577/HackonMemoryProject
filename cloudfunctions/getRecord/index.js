// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const User = db.collection('User')
const Records = db.collection('Records')
const Community = db.collection('Community')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  var a = 0
  var recordsList = []

  //判断获取的列表是用户还是社区
  if (event.isUser) {
    a = 1
    var userInfo = await db.collection('User').where({
      _openid: event.userInfo.openId // 填入当前用户 openid
    }).get()
    var records = userInfo.data[0].records
    for (id in records) {
      r = await Records.doc(records[id]).get()
      recordsList.push(r.data)
    }
  } else {
    a=2
    var userInfo = await db.collection('User').where({
      _openid: event.userInfo.openId // 填入当前用户 openid
    }).get()
    manageComOpenid=userInfo.data[0].manageComOpenid
    comInfo = await Community.doc(manageComOpenid).get()
    records=comInfo.data.records
    for (id in records) {
      r = await Records.doc(records[id]).get()
      recordsList.push(r.data)
    }
  }
  return {
    event,
    recordsList,
  }
}