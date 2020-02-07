const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  console.log("【uploadBasicInfo】","【event】",event,"【end】")
  var info = await db.collection('User').where({
    _openid: event.userOpenid
  }).get()
  console.log("【uploadBasicInfo】", "【info】", info, "【end】")
  return db.collection('User').doc(info.data[0]._id).update({
    data: {
      perInfo: {
        name: event.name,
        tel: event.tel,
        travel: event.toWuhan
      }
    }
  })
}