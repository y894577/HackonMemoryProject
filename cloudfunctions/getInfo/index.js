const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  var userInfo = await db.collection('User').where({
    _openid: event.userOpenid // 填入当前用户 openid
  }).get()
  return {
    userPerInfo: userInfo.data[0].perInfo,
    userManageComOpenid: userInfo.data[0].manageComOpenid
  }
}