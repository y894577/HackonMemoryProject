// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.flag == "1") {
    var result = db.collection('Community').doc(event.comid).update({
      data: {
        resident: _.inc(1)

      }
    })
    console.log("【uploadMemberNum】【result的信息】", result, "【end】")
  }
  else if (event.flag == "2") {
    var result = db.collection('Community').doc(event.comid).update({
      data: {
        visitor: _.inc(1)
      }
    })
    console.log("【uploadMemberNum】【result的信息】", result, "【end】")
  }
}