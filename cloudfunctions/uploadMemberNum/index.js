// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)

  var info = await db.collection('Community').where({
    _id: event.comid
  }).get()


  if (event.flag == "1") {
    var add = info.data[0].resident + 1
    db.collection('Community').doc(event.comid).update({
      data: {
        resident: add

      }
    })
    console.log("【uploadMemberNum】【1  result的信息】",add,"【end】")
  }
  else if (event.flag == "2") {
    var add = info.data[0].visitor + 1
    db.collection('Community').doc(event.comid).update({
      data: {
        visitor: add
      }
    })
    console.log("【uploadMemberNum】【2  result的信息】",add,"【end】")
  }
}