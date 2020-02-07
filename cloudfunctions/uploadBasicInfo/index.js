const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  var info = await db.collection('User').where({
    _openid: event.userOpenid
  }).get()
  db.collection('User').doc(info.data[0]._id).update({
    data: {
      perInfo: {
        name: event.name,
        tel: event.tel,
        travel: event.toWuhan
      }
    }
  })
}